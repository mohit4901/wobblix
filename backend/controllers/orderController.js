import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import crypto from "crypto";
import { sendOrderConfirmationEmail } from "../utils/emailService.js";


// global variables
const currency = "inr";
const deliveryCharge = 10;

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Common function for item formatting

// sanitize items (ensure instruction exists)
const formatItems = (items) => {
  return items.map((item) => ({
    productId: item.productId,
    size: item.size,
    quantity: item.quantity,
    instruction: item.instruction || "", // Ensure field exists

    name: item.name || "",
    price: item.price || 0,
  }));
};



// ================= RAZORPAY =================
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, couponCode } = req.body;

    // Verify coupon on server side to prevent tampering
    let discountPercent = 0;
    if (couponCode === 'NEW10') {
        const previousOrders = await orderModel.find({ userId, payment: true });
        if (previousOrders.length === 0) {
            discountPercent = 10; // 10%
        }
    }

    // Recalculate amount safely on the server to prevent tampering
    let calculatedSubtotal = 0;
    let eligiblePrices = [];
    
    for (const item of items) {
      const product = await productModel.findById(item.productId);
      if (product) {
        calculatedSubtotal += product.price * item.quantity;
        // B4G1 Promo: Tank Tops and Oversized T-Shirts only (NO HOODIES)
        if (product.subCategory === "Tank Tops" || product.subCategory === "Oversized T-Shirts") {
          for (let i = 0; i < item.quantity; i++) {
            eligiblePrices.push(product.price);
          }
        }
      }
    }

    eligiblePrices.sort((a, b) => a - b);
    const freeCount = Math.floor(eligiblePrices.length / 4);
    let b4g1Discount = 0;
    for (let i = 0; i < freeCount; i++) {
      b4g1Discount += eligiblePrices[i];
    }

    const calculatedDiscountAmount = (calculatedSubtotal * discountPercent) / 100;
    
    // Fallback to client delivery fee if india/global difference exists, standard is 100
    const shippingFee = amount - (calculatedSubtotal - calculatedDiscountAmount - b4g1Discount) || 100;
    const finalVerifiedAmount = Math.max(0, calculatedSubtotal - calculatedDiscountAmount - b4g1Discount + shippingFee);

    const formattedItems = formatItems(items);

    const newOrder = new orderModel({
      userId,
      items: formattedItems,
      address,
      amount: finalVerifiedAmount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    const options = {
      amount: Math.round(finalVerifiedAmount * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
      notes: { orderId: newOrder._id.toString() }
    };

    await razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      
      // Update the order in DB with the Razorpay Order ID
      await orderModel.findByIdAndUpdate(newOrder._id, { razorpayOrderId: order.id });
      
      res.json({ success: true, order });
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================= COUPON VALIDATION =================
const verifyCoupon = async (req, res) => {
    try {
        const { userId, couponCode } = req.body;

        if (couponCode !== 'NEW10') {
            return res.json({ success: false, message: "Invalid Coupon Code" });
        }

        // Check if user is a newcomer
        const previousOrders = await orderModel.find({ userId, payment: true });
        if (previousOrders.length > 0) {
            return res.json({ success: false, message: "Coupon valid for first order only" });
        }

        res.json({ success: true, discount: 10, message: "10% Discount Applied!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// ================= VERIFY RAZORPAY =================
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      
      // Verification logic (Bulletproof)
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
      
      const order = await orderModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });

      // Send Email
      if (order) {
        const user = await userModel.findById(userId);
        sendOrderConfirmationEmail(order, user.email);
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
      }

      res.json({ success: true, message: "Payment Successful" });
    } else {

      res.json({ success: false, message: "Payment Failed: Signature mismatch" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= ADMIN =================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    
    // Enrich orders: Fetch names/images for older orders

    const enrichedOrders = await Promise.all(orders.map(async (order) => {
      const enrichedItems = await Promise.all(order.items.map(async (item) => {
        if (!item.name || !item.image) {
          const product = await productModel.findById(item.productId);
          if (product) {
            return {
              ...item.toObject(),
              name: product.name,
              image: product.image
            }
          }
        }
        return item;
      }));
      return { ...order.toObject(), items: enrichedItems };
    }));

    res.json({ success: true, orders: enrichedOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// ================= USER =================
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // Filter for paid orders

    const orders = await orderModel.find({ userId, payment: true });
    
    // Enrich orders: Add names/images to old orders if missing

    const enrichedOrders = await Promise.all(orders.map(async (order) => {
      const enrichedItems = await Promise.all(order.items.map(async (item) => {
        if (!item.name || !item.image) {
          const product = await productModel.findById(item.productId);
          if (product) {
            return {
              ...item.toObject(),
              name: product.name,
              image: product.image
            }
          }
        }
        return item;
      }));
      return { ...order.toObject(), items: enrichedItems };
    }));

    res.json({ success: true, orders: enrichedOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// ================= UPDATE STATUS & TRACKING =================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, trackingNumber, courierPartner, trackingUrl } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (courierPartner !== undefined) updateData.courierPartner = courierPartner;
    if (trackingUrl !== undefined) updateData.trackingUrl = trackingUrl;

    await orderModel.findByIdAndUpdate(orderId, updateData);
    res.json({ success: true, message: "Order Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// ================= RAZORPAY WEBHOOK =================
const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    if (!secret || !signature) return res.status(400).send("Webhook missing credentials");

    const expectedSignature = crypto.createHmac('sha256', secret)
                                    .update(JSON.stringify(req.body))
                                    .digest('hex');

    if (expectedSignature === signature) {
      if (req.body.event === 'payment.captured') {
        const orderId = req.body.payload.payment.entity.notes?.orderId;
        if (orderId) {
          const order = await orderModel.findByIdAndUpdate(orderId, { payment: true });
          if (order) {
             const user = await userModel.findById(order.userId);
             sendOrderConfirmationEmail(order, user.email);
             await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
          }
        }
      }
      res.json({ success: true });
    } else {
      res.status(400).send("Invalid signature");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};


export {
  verifyRazorpay,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  razorpayWebhook,
  verifyCoupon
};

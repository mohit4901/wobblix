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
    const { userId, items, amount, address } = req.body;

    const formattedItems = formatItems(items);

    const newOrder = new orderModel({
      userId,
      items: formattedItems,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    const options = {
      amount: amount * 100,
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
  razorpayWebhook
};

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import crypto from "crypto";

// global variables
const currency = "inr";
const deliveryCharge = 10;

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ✅ COMMON FUNCTION (IMPORTANT 🔥)
// sanitize items (ensure instruction exists)
const formatItems = (items) => {
  return items.map((item) => ({
    productId: item.productId,
    size: item.size,
    quantity: item.quantity,
    instruction: item.instruction || "", // ✅ ensure always present
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

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
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
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );

    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
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
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ================= USER =================
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
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
          if (order) await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
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

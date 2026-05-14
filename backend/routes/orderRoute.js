import express from 'express'
import {placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay, razorpayWebhook, verifyCoupon} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features

orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/verify-coupon', authUser, verifyCoupon)

// verify payment

orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

// Server-to-Server Webhooks
orderRouter.post('/razorpay-webhook', razorpayWebhook)

export default orderRouter
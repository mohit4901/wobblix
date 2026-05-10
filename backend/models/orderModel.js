import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  items: [
    {
      productId: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      instruction: { type: String, default: '' }
    }
  ],

  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: 'Order Placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number, required: true },

  // Delivery Tracking Integration
  trackingNumber: { type: String, default: '' },
  courierPartner: { type: String, default: '' },
  trackingUrl: { type: String, default: '' }
})

export default mongoose.models.order || mongoose.model('order', orderSchema)

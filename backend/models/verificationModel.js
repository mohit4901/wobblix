import mongoose from 'mongoose'

const verificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, expires: 900 } // Automatically delete after 15 minutes (900 seconds)
}, { timestamps: true })

const verificationModel = mongoose.models.verification || mongoose.model('verification', verificationSchema)

export default verificationModel

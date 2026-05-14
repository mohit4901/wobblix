import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    isVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpire: { type: Number, default: 0 }
}, { minimize: false, timestamps: true })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel
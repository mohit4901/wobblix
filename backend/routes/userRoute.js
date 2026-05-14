import express from 'express';
import { loginUser,registerUser,adminLogin, getUserProfile, verifyEmail, resendOtp } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/verify-email', verifyEmail)
userRouter.post('/resend-otp', resendOtp)
userRouter.get('/profile', authUser, getUserProfile)

export default userRouter;
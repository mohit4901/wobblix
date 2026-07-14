import express from 'express';

import {
    loginUser,
    registerUser,
    adminLogin,
    getUserProfile,
    getSecurityQuestion,
    resetPassword
} from '../controllers/userController.js';

import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.post('/admin', adminLogin)

userRouter.get('/profile', authUser, getUserProfile)

userRouter.post('/security-question', getSecurityQuestion)

userRouter.post('/reset-password', resetPassword)

export default userRouter;

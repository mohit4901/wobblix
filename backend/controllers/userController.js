import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import verificationModel from "../models/verificationModel.js";
import { sendVerificationOtpEmail } from "../utils/emailService.js";



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // 1. Check if user is already verified and exists in main DB
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists. Please login." })
        }

        // 2. Validate input
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // 3. Hash password and generate OTP
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4. Save/Update in temporary verification collection
        // This keeps the main user collection clean until verification is complete
        await verificationModel.findOneAndUpdate(
            { email },
            { name, email, password: hashedPassword, otp },
            { upsert: true, new: true }
        );
        
        // 5. Send OTP Email
        sendVerificationOtpEmail(email, otp);

        res.json({ success: true, message: "Verification OTP sent to your email", email })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Route to verify email
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const verificationData = await verificationModel.findOne({ email });

        if (!verificationData) {
            return res.json({ success: false, message: "Verification record not found or expired. Please register again." });
        }

        if (verificationData.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        // OTP is valid - Create the real user
        const newUser = new userModel({
            name: verificationData.name,
            email: verificationData.email,
            password: verificationData.password,
            isVerified: true
        });

        const user = await newUser.save();

        // Delete the temporary verification record
        await verificationModel.deleteOne({ email });

        const token = createToken(user._id);
        res.json({ success: true, message: "Email verified successfully", token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to resend OTP
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user is already verified
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already verified. Please login." });
        }

        const verificationData = await verificationModel.findOne({ email });

        if (!verificationData) {
            return res.json({ success: false, message: "Registration session expired. Please register again." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        verificationData.otp = otp;
        await verificationData.save();

        sendVerificationOtpEmail(email, otp);
        res.json({ success: true, message: "New OTP sent to your email" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { loginUser, registerUser, adminLogin, getUserProfile, verifyEmail, resendOtp }
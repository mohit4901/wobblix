import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
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
            // Check if user is verified
            if (!user.isVerified) {
                // Send new OTP if not verified
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                user.verifyOtp = otp;
                user.verifyOtpExpire = Date.now() + 15 * 60 * 1000;
                await user.save();
                sendVerificationOtpEmail(user.email, otp);

                return res.json({ success: false, message: "Account not verified. OTP sent to your email.", needsVerification: true, email: user.email });
            }

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

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        
        if (exists) {
            if (exists.isVerified) {
                return res.json({ success: false, message: "User already exists" })
            } else {
                // If user exists but is not verified, update their info and send new OTP
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const otp = Math.floor(100000 + Math.random() * 900000).toString();

                exists.name = name;
                exists.password = hashedPassword;
                exists.verifyOtp = otp;
                exists.verifyOtpExpire = Date.now() + 15 * 60 * 1000;
                
                await exists.save();
                sendVerificationOtpEmail(email, otp);

                return res.json({ success: true, message: "Verification OTP sent to your email", email: exists.email })
            }
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();


        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            verifyOtp: otp,
            verifyOtpExpire: Date.now() + 15 * 60 * 1000
        })

        const user = await newUser.save()
        
        // Send OTP Email
        sendVerificationOtpEmail(email, otp);


        res.json({ success: true, message: "Verification OTP sent to your email", email: user.email })



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

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpire < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpire = 0;
        await user.save();

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
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyOtp = otp;
        user.verifyOtpExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        sendVerificationOtpEmail(email, otp);
        res.json({ success: true, message: "New OTP sent to your email" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { loginUser, registerUser, adminLogin, getUserProfile, verifyEmail, resendOtp }
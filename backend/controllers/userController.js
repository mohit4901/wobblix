import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// LOGIN USER
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (isMatch) {

            const token = createToken(user._id)

            res.json({
                success: true,
                token
            })

        } else {

            res.json({
                success: false,
                message: 'Invalid credentials'
            })

        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        })

    }
}


// REGISTER USER
const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            securityQuestion,
            securityAnswer
        } = req.body;

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists. Please login."
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        )

        const hashedAnswer = await bcrypt.hash(
            securityAnswer.toLowerCase(),
            salt
        )

        const newUser = new userModel({
            name,
            email,

            password: hashedPassword,

            securityQuestion,
            securityAnswer: hashedAnswer,

            isVerified: true
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        })

    }
}


// ADMIN LOGIN
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const token = jwt.sign(
                email + password,
                process.env.JWT_SECRET
            );

            res.json({
                success: true,
                token
            })

        } else {

            res.json({
                success: false,
                message: "Invalid credentials"
            })

        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        })

    }
}


// USER PROFILE
const getUserProfile = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await userModel
            .findById(userId)
            .select("-password");

        res.json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
}


// GET SECURITY QUESTION
const getSecurityQuestion = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            question: user.securityQuestion
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })

    }
}


// RESET PASSWORD
const resetPassword = async (req, res) => {
    try {

        const {
            email,
            answer,
            newPassword
        } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isAnswerCorrect = await bcrypt.compare(
            answer.toLowerCase(),
            user.securityAnswer
        )

        if (!isAnswerCorrect) {
            return res.json({
                success: false,
                message: "Wrong answer"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(
            newPassword,
            salt
        )

        user.password = hashedPassword;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successful"
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })

    }
}


export {
    loginUser,
    registerUser,
    adminLogin,
    getUserProfile,
    getSecurityQuestion,
    resetPassword
}

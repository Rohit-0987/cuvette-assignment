const User = require('../models/User');
const twilio = require('twilio');
const { sendEmail } = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Register User
exports.register = async (req, res) => {
    const { name, phone, companyName, companyEmail, employeeSize, password } = req.body;

    try {
        let user = await User.findOne({ companyEmail });
        if (user) {
            return res.status(400).json({ message: "Company already exists" });
        }

        // Generate Mobie OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        //Generate Email OTP
        const emailOtp = Math.floor(100000 + Math.random() * 900000); // For email

        // Create new user
        user = await User.create({
            name, phone, companyName, companyEmail, employeeSize, password, otp,emailOtp
        });

        // Send OTP via SMS (Twilio)
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        const emailOptions = {
            email: companyEmail,
            subject: 'OTP Verification',
            message: `Your OTP for verification is ${emailOtp}.`,
        };
        
        
        await sendEmail(emailOptions.email, emailOptions.subject, emailOptions.message);
        res.status(200).json({ message: "OTP sent successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// OTP Verification
exports.verifyOtp = async (req, res) => {
    const { userId, mobileOtp, emailOtp } = req.body;
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify Mobile OTP
        let mobileVerified = false;
        if (user.otp === mobileOtp) {
            user.isVerified = true;
            user.otp = null; // Set OTP to null after verification
            mobileVerified = true;
        } else {
            return res.status(400).json({ message: "Invalid Mobile OTP" });
        }
        // Verify Email OTP
        let emailVerified = false;
        if (user.emailOtp == emailOtp) {
            user.emailVerified = true;
            user.emailOtp = null; // Set OTP to null after verification
            emailVerified = true;
        } else {
            return res.status(400).json({ message: "Invalid Email OTP" });
        }

        // Save the user's new status
        await user.save();

        // If both are verified
        if (mobileVerified && emailVerified) {
            // Generate JWT token after both verifications
            const token = user.getSignedJwtToken();
            return res.status(200).json({ message: "Verification successful", token });
        }

    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    companyEmail = email;
    try {
        const user = await User.findOne({ companyEmail }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your account" });
        }

        const token = user.getSignedJwtToken();
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true
    },
    employeeSize: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    otp: {
        type: String,
        required: false, // still required initially
        default: null // But it can be set to null after verification
    },
    emailOtp: Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerified: { type: Boolean, default: false }, // Email verification status

});

// Password encryption
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Password verification
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

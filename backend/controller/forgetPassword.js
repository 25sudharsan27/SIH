const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

async function forgetPasswordController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error("Please provide an email");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User with this email does not exist");
        }

        const resetToken = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `You requested for a password reset. Click the link below to reset your password: 
            ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("Error sending email");
            }
            console.log("Email sent: " + info.response);
        });

        res.status(200).json({
            message: "Password reset email sent successfully",
            success: true,
            error: false
        });
    } catch (error) {
        console.log("error: ", error.message);
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = forgetPasswordController;

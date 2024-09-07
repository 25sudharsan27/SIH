const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function resetPasswordController(req, res) {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            throw new Error("Invalid or expired token");
        }
        if (!newPassword) {
            throw new Error("Please provide a new password");
        }

        // Verify token
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await userModel.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error("Invalid token or user does not exist");
        }

        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt);

        if (!hashPassword) {
            throw new Error("Error hashing password");
        }

        // Update the user's password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            message: "Password has been reset successfully",
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

module.exports = resetPasswordController;

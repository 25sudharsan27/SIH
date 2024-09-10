const organizationModel = require("../../models/organizationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

async function userSignInController(req, res) {
    try {
        console.log("checking");
        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            throw new Error("Please provide Email");
        }

        if (!password) {
            throw new Error("Please provide a password");
        }

        const organization = await organizationModel.findOne({ email });
        if (!organization) {
            throw new Error("Organization Not found");
        }

        // Use 'organization.password' instead of 'user.password'
        const checkPassword = await bcrypt.compare(password, organization.password);
        console.log(`checkPassword = ${checkPassword}`);

        if (checkPassword) {
            const tokenData = {
                "_id": organization._id,
                "email": organization.email // Use 'organization.email' instead of 'user.email'
            };

            const token = await jwt.sign(tokenData, process.env.ORG_TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            };

            res.cookie("token", token, tokenOption).status(200).json({
                data: token,
                message: "User Password is correct",
                error: false,
                success: true
            });
        } else {
            throw new Error("User Password is Incorrect");
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;

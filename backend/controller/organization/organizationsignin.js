const organizationModel = require('../../models/organizationModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Ensure dotenv is configured

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required', 
                error: true, 
                success: false 
            });
        }

        const organization = await organizationModel.findOne({ email });
        if (!organization) {
            return res.status(404).json({ 
                message: 'Organization not found', 
                error: true, 
                success: false 
            });
        }

        const checkPassword = await bcrypt.compare(password, organization.password);
        if (checkPassword) {
            const tokenData = {
                _id: organization._id,
                email: organization.email
            };

            const token = jwt.sign(tokenData, process.env.ORG_TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Optional: adds an additional layer of security
            };

            res.cookie('token', token, tokenOptions).status(200).json({
                
                data: token,
                message: 'User authenticated successfully',
                error: false,
                success: true
            });
        } else {
            res.status(401).json({ 
                message: 'Incorrect password', 
                error: true, 
                success: false 
            });
        }
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;

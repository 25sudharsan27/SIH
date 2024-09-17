const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function orgauthToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(400).json({
                message: 'User not logged in',
                error: true,
                success: false
            });
        }
        console.log("secret key "+process.env.ORG_TOKEN_SECRET_KEY);
        jwt.verify(token, process.env.ORG_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('Authentication error:', err);
                return res.status(401).json({
                    message: 'Invalid or expired token',
                    error: true,
                    success: false
                });
            }

            req.user_id = decoded?._id;
            console.log("secret key "+process.env.ORG_TOKEN_SECRET_KEY);

            next();
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
}

module.exports = orgauthToken;

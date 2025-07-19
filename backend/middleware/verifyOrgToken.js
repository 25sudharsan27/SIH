const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const orgauthToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(400).json({
                message: 'Token was not Provided, Please Login Again',
                error: true,
                success: false
            });
        }
        jwt.verify(token, process.env.ORG_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
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

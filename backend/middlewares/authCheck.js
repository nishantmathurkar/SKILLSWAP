const detokenize = require("../utils/detokenizer");
const User = require("../models/userModel");

const authCheck = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        console.log("Incoming cookies:", req.cookies);

        // ❌ NO TOKEN
        if (!token) {
            return res.status(401).json({
                message: "No token, please login first"
            });
        }

        let decodedToken;

        try {
            decodedToken = detokenize(token);
        } catch (err) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        if (!decodedToken?.email) {
            return res.status(401).json({
                message: "Token missing email"
            });
        }

        // ✅ FIXED USER SEARCH (LESS STRICT)
        const userExists = await User.findOne({
            email: decodedToken.email
        });

        if (!userExists) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        console.log("Session verified successfully");

        req.user = userExists;
        req.body._id = userExists._id;

        next();

    } catch (error) {
        console.log("Auth error:", error);

        return res.status(500).json({
            message: "Auth server error"
        });
    }
};

module.exports = { authCheck };
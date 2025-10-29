const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "please login first"
        })
    }

    try {

        const decoded = jwt.verify(token, '0a16210099db6e083757d93dbd96a095')

        const user = await UserModel.findById(decoded.id)

        req.user = user

        next()

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        console.error("Full Error:", error);

        return res.status(401).json({
            message: "Invalid token"
        })
    }

}
module.exports = { authUserMiddleware }
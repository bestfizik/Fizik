const jwt = require("jsonwebtoken")

const userChecker = (req, res, next) => {
    try {
    
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

    
        const decoded = jwt.verify(token, process.env.SEKRET_KEY)
        req.user = decoded

        next()

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = userChecker

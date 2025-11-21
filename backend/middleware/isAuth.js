const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        
        // 1. Handle Missing Token (Should be 401 Unauthorized)
        if (!token) {
            // Return 401: Client needs to authenticate (login)
            return res.status(401).json({ message: "Unauthorized: No token provided" }); 
        }
        
        // 2. Verify Token
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // The jwt.verify function either returns a payload or throws an error.
        // This check is redundant because if verifyToken were falsy, it would have already thrown.
        // However, if you keep it:
        if (!verifyToken) {
            // Return 401: Token is somehow invalid despite passing verify (highly unlikely)
            return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
        }
        
        // 3. Success: Attach ID and Continue
        req.userId = verifyToken.userId;
        next();

    } catch (err) {
        // This block catches errors like TokenExpiredError, JsonWebTokenError (for invalid signature/format)
        console.log("isAuth Error:", err.message);
        
        // Return 401: The token provided (expired or invalid) is not acceptable credentials
        return res.status(401).json({ message: "Unauthorized: Token is invalid or expired" });
    }
}

module.exports={isAuth};
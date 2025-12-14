const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        
       
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" }); 
        }
        
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        
       
        if (!verifyToken) {
            
            return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
        }
        
        req.userId = verifyToken.userId;
        next();

    } catch (err) {
      
        console.log("isAuth Error:", err.message);
        
        
        return res.status(401).json({ message: "Unauthorized: Token is invalid or expired" });
    }
}

module.exports={isAuth};
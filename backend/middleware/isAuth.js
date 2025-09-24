const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const isAuth=async(req,res,next)=>{
    try{
        let {token}=req.cookies;
        if(!token){
            return res.status(400).json({message:"User dont have token"})
        }
        let verifyToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"User dont have valid token"})
        }
        req.userId=verifyToken.userId
        next();

    }
    catch(err){
        console.log("isAuth Error");
        return res.status(400).json({message:`isAuth Error ${err}`});

    }

}
module.exports={isAuth};
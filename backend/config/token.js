const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

 const genToken=async(userId)=>{
    try{
        let token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
        return token;
    }
    catch(err){
        console.log("Token Error");
    }

}

 const genToken1=async(email)=>{
    try{
        let token=await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
        return token;
    }
    catch(err){
        console.log("Token Error");
    }

}
module.exports={genToken,genToken1};
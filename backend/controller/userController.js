const User = require("../model/userModel.js");

const getCurrentUser=async(req,res)=>{
    try{
        if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }
        
        let user=await User.findById(req.userId).select("-password");//dont want password 
        if(!user){
            return res.status(401).json({message:"User is not found"});
        }
            return res.status(200).json(user);

    }
    catch(error){
        console.log(error)
         return res.status(500).json({message:`getCurrentUser error ${error}`})
    }


}

const getCurrentAdmin=async(req,res)=>{
    try{
    let adminEmail=req.adminEmail;
    if(!adminEmail){
      return res.status(404).json({ message: "Admin is not found" });


    }
    return res.status(200).json({
        email:adminEmail,
        role:"admin"
    })
}
catch(error){


     console.log(error)
         return res.status(500).json({message:`getAdmin error ${error}`})
}

}

module.exports= {getCurrentUser,getCurrentAdmin};
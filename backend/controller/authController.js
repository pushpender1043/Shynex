const  {genToken,genToken1} =require( '../config/token');
const User=require('../model/userModel');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const Registration=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        //   console.log("user Data",req.body);
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User Already Exist"});
        }
        if(!validator.isEmail(email)){
              return res.status(400).json({message:"Enter Valid mail"});
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter Strong Password"});
        }

        let hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashPassword});
        let token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        });
      
        return res.status(201).json({user});


    }
    catch(error){
        console.log("Signup Error");
        return res.status(500).json({message:`Registration Error ${error}`})

    }
}

const login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
              return res.status(404).json({message:`user not found`})
        }
        let isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
             
        }
         let token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Lax",
            maxAge:7*24*60*60*1000
        });
        return res.status(201).json({message:"Login Sucessfull!"});

    }
    catch(error){
         return res.status(400).json({message:`Login error ${error}`})

    }
}



const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
         return res.status(200).json({message:"Log out Successful!"})
    }
    catch(error){
        console.log("LogOut Error");
         return res.status(400).json({message:`Logout error ${error}`})


    }

}

const googleLogin=async(req,res)=>{
    try{
        let {name,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
             user=await User.create({name,email});
             
        }
         let token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxage:7*24*60*60*1000
        });
        return res.status(200).json(user);

    }
    catch(error){
        console.log("google error")
         return res.status(500).json({message:`Login error ${error}`})


    }
}

const adminLogin=async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
            let token=await genToken1(email);
            res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxage:1*24*60*60*1000
        });
        return res.status(200).json(token);

        }
        return res.status(400).json({message:"Invalid Credentials"})

    }
    catch(error){
        console.log("AdminLogin Error");
        return res.status(500).json({message:`AdminError ${error}`})
    
    }

}

module.exports={Registration,login,logout,googleLogin,adminLogin}
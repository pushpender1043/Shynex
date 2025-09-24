const express=require('express');
const { isAuth } = require('../middleware/isAuth.js');
const {getCurrentUser,getCurrentAdmin} = require('../controller/userController.js');
const { adminAuth } = require('../middleware/adminAuth.js');
const userRoutes=express.Router();  

userRoutes.get("/getCurrentuser",isAuth,getCurrentUser);
userRoutes.get("/getadmin",adminAuth,getCurrentAdmin);


module.exports=userRoutes;

const express=require('express');
const {Registration,login,logout, googleLogin, adminLogin}=require('../controller/authController')


const authRoutes=express.Router();
authRoutes.post('/registration',Registration);
authRoutes.post('/login',login);
authRoutes.get('/logout',logout);
authRoutes.post('/googlelogin',googleLogin);
authRoutes.post('/adminlogin',adminLogin);

module.exports= authRoutes;

const express=require('express');
const { addToCart, getUserCart, UpdateCart } =require( '../controller/cartController');
const { isAuth } = require('../middleware/isAuth.js');

const cartRoutes=express.Router()


cartRoutes.post('/get',isAuth,getUserCart)
cartRoutes.post('/add',isAuth,addToCart)
cartRoutes.post('/update',isAuth,UpdateCart)




module.exports=  cartRoutes;
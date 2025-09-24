const express=require('express')
const { isAuth } = require('../middleware/isAuth.js');
const { PlaceOrder, userOrders, allOrders, updateStatus, placeOrderRazorpay, verifyRazorPay } = require('../controller/orderController.js');
const { adminAuth } = require('../middleware/adminAuth.js');


const orderRoutes=express.Router()


//for user
orderRoutes.post('/placeOrder',isAuth,PlaceOrder)
orderRoutes.post('/razorpay',isAuth,placeOrderRazorpay)
orderRoutes.post('/verifyrazorpay',isAuth,verifyRazorPay)


orderRoutes.post('/userOrder',isAuth,userOrders)

//for admin
orderRoutes.post('/list',adminAuth,allOrders)
orderRoutes.post('/status',adminAuth,updateStatus)






module.exports={orderRoutes};

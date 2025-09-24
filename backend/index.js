const express=require('express');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const cors=require('cors');
const User = require('./model/userModel');
const  userRoutes  = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes  = require('./routes/cartRoutes.js');
const { orderRoutes } = require('./routes/orderRoutes.js');

dotenv.config();
let app=express();
let port=process.env.PORT||6000;
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)





app.get('/',(req,res)=>{
    res.send("Hello!")

})


app.listen(port,()=>{
    console.log(`Connected running on ${port}`);
    connectDB();
})


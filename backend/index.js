const express=require('express');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute.js');
const cors=require('cors');
const User = require('./model/userModel');
const  userRoutes  = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes  = require('./routes/cartRoutes.js');
const { orderRoutes } = require('./routes/orderRoutes.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path=require('path');



dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-pro"
});



let app = express();



// const __dirname=path.resolve();



let port=process.env.PORT||8000;
app.use(cors({
    origin:["http://localhost:5173",
        "http://localhost:5174",
        "https://shynex-6ejo.vercel.app",
        "https://shynex.onrender.com"
    ],
    credentials:true
}))
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)




app.get('/', (req, res) => res.send('API is running'));

app.post("/api/chatbot/message", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing" });
    }

    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      return res.status(500).json({ error: "No response from Gemini" });
    }

    const text = result.response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("🔥 Gemini ERROR:", error.message);

    return res.status(500).json({
      error: "Gemini failed",
      details: error.message
    });
  }
});



// app.use(express.static(path.join(__dirname,"/frontend/dist")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
// })

app.listen(port,()=>{
    console.log(`Connected running on ${port}`);
    connectDB();
})


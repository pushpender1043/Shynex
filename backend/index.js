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
const { GoogleGenAI } = require('@google/genai');
const path=require('path');



dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
const model = "gemini-2.5-flash";

let app=express();


// const __dirname=path.resolve();



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






app.post('/api/chatbot/message', async (req, res) => {
    try {
        const { prompt, history } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is missing" });
        }

        const formattedHistory = history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

    
        const response = await ai.models.generateContent({
            model: model,
            contents: [...formattedHistory, { role: 'user', parts: [{ text: prompt }] }]
        });

        const aiReply = response.text;
        res.json({ reply: aiReply }); 

    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ error: "Failed to generate AI response." });
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


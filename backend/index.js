const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shynex-6ejo.vercel.app",
    "https://shynex.onrender.com"
  ],
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ✅ Gemini setup (FINAL)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash"
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ Chatbot route
app.post("/api/chatbot/message", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing" });
    }

    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      return res.status(500).json({ reply: "AI did not respond" });
    }

    const text = result.response.text();
    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("🔥 Gemini Error:", error);
    res.status(500).json({
      error: "Gemini API failed",
      details: error.message
    });
  }
});

// ✅ Server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

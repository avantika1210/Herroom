const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
router.get("/test",(req,res)=>{
    res.json({
        message:"Ai is working",
    });
}

);
router.post("/generate-description", async (req, res) => {
  try {
    const { productName, category } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Write a short, attractive product description for:
      
Product Name: ${productName}
Category: ${category}

Keep it professional and appealing for customers.`,
    });

    res.json({
      description: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate description",
    });
  }
});






module.exports=router;
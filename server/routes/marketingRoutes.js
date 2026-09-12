const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const { productName, category, price } = req.body;

    const prompt = `
You are a marketing assistant for a small women-owned business.

Create marketing content for this product:

Product Name: ${productName}
Category: ${category}
Price: ₹${price}

Return ONLY valid JSON.
Do not use markdown.
Do not wrap the JSON in markdown code blocks.

Use exactly these fields:
{
  "instagramCaption": "",
  "whatsappMessage": "",
  "tagline": "",
  "hashtags": []
}

Make the content attractive, warm, professional and suitable for customers.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const marketingContent = JSON.parse(response.text);

    res.json({
      marketingContent,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate marketing content",
    });
  }
});

module.exports = router;
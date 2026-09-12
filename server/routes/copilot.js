const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { businessId, message } = req.body;

    const products = await Product.find({
  business: businessId,
});
const businessContext = {
  totalProducts: products.length,
  products: products.map((product) => ({
    name: product.name,
    price: product.price,
    category: product.category,
  })),
};

const prompt = `
You are an AI business copilot for a small women-owned business.

Business data:
${JSON.stringify(businessContext)}

User question:
"${message}"

Give a SHORT and practical answer.

Rules:
- Maximum 3 recommendations.
- Each recommendation should be 1-2 sentences.
- Avoid long explanations.
- Avoid markdown.
- Avoid greetings.
- Do not repeat the business data unnecessarily.
- Focus only on the user's question.

Return ONLY valid JSON in this format:

{
  "answer": "",
  "actions": []
}
`;

console.log("Prompt:", prompt);
const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

const answer = response.text;
res.json({
 answer,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to process copilot request",
    });
  }
});

module.exports = router;
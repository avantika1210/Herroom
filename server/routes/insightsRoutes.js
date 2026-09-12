const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


router.post("/generate", async (req, res) => {
  try {
    const { businessId } = req.body;


    const products = await Product.find({ business: businessId });

    const totalProducts = products.length;

    const totalValue = products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const averagePrice =
      totalProducts > 0 ? totalValue / totalProducts : 0;

    const prices = products.map((product) => product.price);

    const minPrice =
      totalProducts > 0 ? Math.min(...prices) : 0;

    const maxPrice =
      totalProducts > 0 ? Math.max(...prices) : 0;
const categoryCount = {};
products.forEach((product) => {

  const category = product.category;

  categoryCount[category] =

    (categoryCount[category] || 0) + 1;

});

const prompt = `
You are an AI business advisor for a small women-owned business.

Analyze the following business data:

Total Products: ${totalProducts}
Total Listed Value: ₹${totalValue}
Average Product Price: ₹${averagePrice}
Minimum Product Price: ₹${minPrice}
Maximum Product Price: ₹${maxPrice}

Category Distribution:
${JSON.stringify(categoryCount)}

Provide useful and practical business insights.

Return ONLY valid JSON.
Do not use markdown.

Use exactly these fields:

{
  "summary": "",
  "insights": [],
  "recommendations": []
}
`;

const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

const insights = JSON.parse(response.text);


    res.json({
      totalProducts,
      totalValue,
      averagePrice,
      minPrice,
      maxPrice,
      categoryCount,
      insights,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate business insights",
    });
  }
});

module.exports = router;
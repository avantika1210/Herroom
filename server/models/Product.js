const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    default: "general",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
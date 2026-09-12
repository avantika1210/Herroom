const Product = require("../models/Product");
const Business = require("../models/Business");
const Notification = require("../models/Notification");
const createProduct = async (req, res) => {
  try {
    const { businessId, name, description, price } = req.body;
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }
    if (business.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }
    const product = await Product.create({
      business: businessId,
      name,
      description,
      price,
    });
    await Notification.create({
      user: req.user._id,
      title: "Product Created",
      message: `${product.name} has been added successfully.`,
      type: "product",
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getProductsByBusiness = async (req, res) => {
  try {
    const products = await Product.find({
      business: req.params.businessId,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ============================
// GET ALL PRODUCTS
// ============================

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "business",
      "businessName"
    );

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("business");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.business.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Product Updated",
      message: `${updated.name} has been updated successfully.`,
      type: "product",
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("business");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.business.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const productName = product.name;

    await product.deleteOne();

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Product Deleted",
      message: `${productName} has been deleted successfully.`,
      type: "product",
    });

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  createProduct,
  getProductsByBusiness,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
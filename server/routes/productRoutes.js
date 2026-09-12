const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductsByBusiness,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

// CREATE PRODUCT
router.post("/", protect, createProduct);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET BY BUSINESS
router.get("/business/:businessId", getProductsByBusiness);

// UPDATE
router.put("/:id", protect, updateProduct);

// DELETE
router.delete("/:id", protect, deleteProduct);

module.exports = router;
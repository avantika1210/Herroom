const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");



router.get("/", protect, getOrders);

router.get("/:id", protect, getOrderById);

router.patch("/:id/status", protect, updateOrderStatus);

router.post("/", protect, createOrder);

module.exports = router;
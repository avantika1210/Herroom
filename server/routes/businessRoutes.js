const express = require("express");
const router = express.Router();

const {
  createBusiness,
  getMyBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBusiness);

router.get("/my", protect, getMyBusiness);

router.get("/", getAllBusinesses);

router.get("/:id", protect, getBusinessById);

router.put("/:id", protect, updateBusiness);

router.delete("/:id", protect, deleteBusiness);

module.exports = router;
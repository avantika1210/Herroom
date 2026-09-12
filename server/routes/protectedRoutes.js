const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// TEST PROTECTED ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route 🔐",
    user: req.user,
  });
});

module.exports = router;
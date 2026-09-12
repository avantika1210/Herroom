const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../controllers/notificationController");

// Get all notifications
router.get("/", protect, getNotifications);

// Get unread notification count
router.get("/unread-count", protect, getUnreadCount);

// Create notification
router.post("/", protect, createNotification);

// Mark notification as read
router.put("/:id/read", protect, markAsRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;
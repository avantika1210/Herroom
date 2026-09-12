const Notification = require("../models/Notification");

// ============================
// GET ALL NOTIFICATIONS
// ============================

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// CREATE NOTIFICATION
// ============================

const createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const notification = await Notification.create({
      user: req.user._id,
      title,
      message,
      type,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// MARK AS READ
// ============================

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    notification.read = true;

    await notification.save();

    res.json({
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// DELETE NOTIFICATION
// ============================

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await notification.deleteOne();

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET UNREAD COUNT
// ============================

const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      read: false,
    });

    res.json({
      unread: count,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  getUnreadCount,
};
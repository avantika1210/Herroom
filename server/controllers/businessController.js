const Business = require("../models/Business");
const Notification = require("../models/Notification");
const createBusiness = async (req, res) => {
  try {
    const { businessName, description, category } = req.body;

    const business = await Business.create({
      user: req.user._id,
      businessName,
      description,
      category,
    });

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Business Created",
      message: `${business.businessName} has been created successfully.`,
      type: "business",
    });

    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getMyBusiness = async (req, res) => {
  try {
    const businesses = await Business.find({
      user: req.user._id,
    });

    res.json(businesses);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate(
      "user",
      "name email"
    );

    res.json(businesses);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

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

    res.json(business);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

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

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Business Updated",
      message: `${updatedBusiness.businessName} was updated successfully.`,
      type: "business",
    });

    res.json(updatedBusiness);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

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

    const businessName = business.businessName;

    await business.deleteOne();

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Business Deleted",
      message: `${businessName} has been deleted successfully.`,
      type: "business",
    });

    res.json({
      message: "Business deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createBusiness,
  getMyBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
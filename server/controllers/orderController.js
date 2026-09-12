const Order = require("../models/Order");
const Product = require("../models/Product");
const Business = require("../models/Business");
const createOrder = async (req, res) => {
  try {
  const { customer, items, source } = req.body;
    const business = await Business.findOne({
      user: req.user._id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business profile not found",
      });
    }
    if (!customer?.name || !customer?.phone) {
      return res.status(400).json({
        message: "Customer name and phone are required",
      });
    }

    // 3️⃣ Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }
    const productIds = items.map((item) => item.productId);

  const products = await Product.find({
  _id: { $in: productIds },
  business: business._id,
});
    if (products.length !== items.length) {
      return res.status(404).json({
        message: "One or more products not found",
      });
    }

    
    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId
      );

      const quantity = Number(item.quantity);

      if (!quantity || quantity < 1) {
        throw new Error("Invalid quantity");
      }

      totalAmount += product.price * quantity;

      return {
        productId: product._id,
        quantity,
        price: product.price,
      };
    });

    const order = await Order.create({
      businessId: business._id,
      customer,
      items: orderItems,
      totalAmount,
       source: source || "Other",
    });
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};


const getOrders = async (req, res) => {
  try {
    const business = await Business.findOne({
      user: req.user._id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business profile not found",
      });
    }

    // Query parameters
    const { status, search } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {
      businessId: business._id,
    };
if (search) {
  filter.$or = [
    { "customer.name": { $regex: search, $options: "i" } },
    { "customer.phone": { $regex: search, $options: "i" } },
  ];
}
    // Filter by status if provided
    if (status) {
      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Delivered",
        "Cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid order status",
        });
      }

      filter.status = status;
    }

    // Fetch orders
    const orders = await Order.find(filter)
      .populate("items.productId", "name price category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total orders
    const totalOrders = await Order.countDocuments(filter);

    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        limit,
      },
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const business = await Business.findOne({
      user: req.user._id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business profile not found",
      });
    }

const order = await Order.findOne({
  _id: req.params.id,
  businessId: business._id,
}).populate("items.productId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const business = await Business.findOne({
      user: req.user._id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business profile not found",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      businessId: business._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Allowed status transitions
    const allowedTransitions = {
      Pending: ["Confirmed", "Cancelled"],
      Confirmed: ["Delivered", "Cancelled"],
      Delivered: [],
      Cancelled: [],
    };

    if (!allowedTransitions[order.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change order status from ${order.status} to ${status}`,
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,

};
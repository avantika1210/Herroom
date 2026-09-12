const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },

      phone: {
        type: String,
        required: true,
        trim: true
      }
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "Order must contain at least one product"
      }
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending"
    },

source: {
  type: String,
  enum: ["WhatsApp", "Instagram", "In Person", "Phone", "Other"],
  default: "Other"
},

    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
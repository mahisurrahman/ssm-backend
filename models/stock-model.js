const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  stockQuantity: {
    type: Number,
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
  
  isActive: {
    type: Boolean,
    default: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  createDate: {
    type: Date,
    default: new Date(),
  },

  deleteDate: {
    type: Date,
    default: "",
  },
});

const Stocks = new mongoose.model("Stocks", stockSchema);

module.exports = Stocks;


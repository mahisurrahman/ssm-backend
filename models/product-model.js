const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stockId: {
    type: String,
    required: true,
  },
  price: {
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

const Products = new mongoose.model("Product", productSchema);

module.exports = Products;

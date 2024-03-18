const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  sellingPrice: {
    type: Number,
    required: true,
  },
  buyingPrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
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
  createdDate: {
    type: Date,
    default: new Date(),
  },
  deleteDate: {
    type: Date,
    default: null,
  },
});

const sales = new mongoose.model("Sale", salesSchema);

module.exports = sales;

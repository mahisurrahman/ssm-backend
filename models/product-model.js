const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
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
    defalut: Date.now(),
  },
  deleteDate: {
    type: Date,
    default: "",
  },
});

const Products =  new mongoose.model('Product', productSchema);

module.exports = Products;

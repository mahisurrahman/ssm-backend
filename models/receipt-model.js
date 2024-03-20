const mongoose = require("mongoose");

const recieptSchema = new mongoose.Schema({
  ReceiptKey: {
    type: String,
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
  createdDate: {
    type: Date,
    default: new Date(),
  },
  deleteDate: {
    type: Date,
    default: null,
  },
  totalLoss: {
    type: Number,
    required: true,
  },
  totalProfit: {
    type: Number,
    required: true,
  },
  //   UUID4
  soldProducts: [
    {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      salesId: {
        type: String,
        required: true,
      },
      quantitySold: {
        type: Number,
        required: true,
      },
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
        required: true,
      },
      loss: {
        type: Number,
        required: true,
      },
    },
  ],
});

const receipts = new mongoose.model("Receipt", recieptSchema);

module.exports = receipts;

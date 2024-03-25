const mongoose = require("mongoose");

const dailyReportSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  totalBuyingPrice: {
    type: Number,
    required: true,
  },
  totalSellingPrice: {
    type: Number,
    required: true,
  },
  totalProfit: {
    type: Number,
    required: true,
  },
  totalLoss: {
    type: Number,
    required: true,
  },
  totalQuantitySold: {
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

const DailyReports = new mongoose.model("DailyReport", dailyReportSchema);

module.exports = DailyReports;

const express = require("express");
const router = express.Router();
const recieptServices = require("../../core/services/receipt/receiptServices");

//Show All Reciepts//
const allReciepts = async (req, res) => {
  try {
    const response = await recieptServices.showReciepts();
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//show single Receipts//
const showSingleReceipt = async (req, res) => {
  try {
    const response = await recieptServices.showSingleReceipts(req.params);
    return res.send(response);
  } catch (error) {
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Cancel Existing Reciepts//
const cancelReciepts = async (req, res) => {
  try {
    const response = await recieptServices.removeReceipts(req.params);
    return res.send(response);
  } catch (error) {
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

module.exports = { allReciepts, showSingleReceipt, cancelReciepts };

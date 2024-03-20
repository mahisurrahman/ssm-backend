const express = require("express");
const router = express.Router();
const recieptServices = require("../../core/services/receipt/receiptServices");

//Create New Reciept//
// const createReceipt = async (req, res) => {
//   try {
//     const response = await recieptServices.generateReciept(req.params);
//     return res.send(response);
//   } catch (error) {
//     console.log(error);
//     return res.send({
//       status: 500,
//       error: true,
//       message: "Internal Server Error",
//       data: error,
//     });
//   }
// };

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

module.exports = { allReciepts };

const saleServices = require("../../core/services/sales/saleServices.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Register New Sales//
const registerSales = async (req, res) => {
  try {
    const response = await saleServices.createSales(req.body);
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

module.exports = { registerSales };

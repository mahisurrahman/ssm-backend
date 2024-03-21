const saleServices = require("../../core/services/sales/saleServices.js");
const express = require("express");
const router = express.Router();

//Register New Sales//
const registerSales = async (req, res) => {
  try {
    const { sales } = req.body;
    const response = await saleServices.checkSalesData(sales);
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

//Show All Sales//
const showSales = async (req, res) => {
  try {
    const response = await saleServices.showAllSales();
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

//Show Individual Sales//
const showSingleSale = async (req, res) => {
  try {
    const response = await saleServices.showSingleSale(req.params);
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

//Delete Individual Sales//
const deleteSales = async (req, res) => {
  try {
    const response = await saleServices.removeSales(req.params);
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

module.exports = { registerSales, showSales, showSingleSale, deleteSales };

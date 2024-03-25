const express = require("express");
const router = express.Router();
const dailyRprtSrvcs = require("../../core/services/dailyReport/dailyReportServices");

//Generate New Report//
const generateDailyReport = async (req, res) => {
  try {
    const response = await dailyRprtSrvcs.newDailyReport(req.body);
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

//Show All Report//
const showAllDailyReport = async (req, res) => {};

//Show Single Report//
const showSingleDailyReport = async (req, res) => {};

//Delete Single Report//
const deleteDailyReport = async (req, res) => {};

module.exports = {
  generateDailyReport,
  showAllDailyReport,
  showSingleDailyReport,
  deleteDailyReport,
};

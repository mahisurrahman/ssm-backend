const express = require("express");
const router = express.Router();
const dailyRprtSrvcs = require("../../core/services/dailyReport/dailyReportServices");

//Generate New Report//
// const generateDailyReport = async (req, res) => {
//   try {
//     const response = await dailyRprtSrvcs.newDailyReport(req.body);
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

//Show All Report//
const showAllDailyReport = async (req, res) => {
  try {
    const response = await dailyRprtSrvcs.showDailyReports();
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

//Show Single Report//
const showSingleDailyReport = async (req, res) => {
  try {
    const response = await dailyRprtSrvcs.showSingleDailyReports(req.params);
    return res.send(response);
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

//Delete Single Report//
const deleteDailyReport = async (req, res) => {
  try {
    const response = await dailyRprtSrvcs.deleteSingleDailyReport(req.params);
    return res.send(response);
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

module.exports = {
  // generateDailyReport,
  showAllDailyReport,
  showSingleDailyReport,
  deleteDailyReport,
};

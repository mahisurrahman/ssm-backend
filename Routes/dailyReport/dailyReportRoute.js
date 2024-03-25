const express = require("express");
const router = express.Router();
const {
  generateDailyReport,
  showAllDailyReport,
  showSingleDailyReport,
  deleteDailyReport,
} = require("../../controllers/dailyReportController/dailyReportController");

router.post("/crt");
router.get("/src", showAllDailyReport);
router.get("/src/:id", showSingleDailyReport);
router.get("/del/:id", deleteDailyReport);

module.exports = router;

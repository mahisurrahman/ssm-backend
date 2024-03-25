const express = require("express");
const router = express.Router();
const {
  generateDailyReport,
} = require("../../controllers/dailyReportController/dailyReportController");

router.post("/crt", generateDailyReport);
router.get("/src");
router.get("/src/:id");
router.get("/del/:id");

module.exports = router;

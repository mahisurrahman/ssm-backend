const express = require("express");
const router = express.Router();
const {
  registerSales,
  showSales,
  showSingleSale,
  deleteSales,
} = require("../../controllers/saleController/sale-controller.js");

router.post("/crt", registerSales);
router.get("/src", showSales);
router.get("/src/:id", showSingleSale);
router.get("/del/:id", deleteSales);

module.exports = router;

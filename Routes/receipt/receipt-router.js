const express = require("express");
const {
  allReciepts,
  showSingleReceipt,
  cancelReciepts,
} = require("../../controllers/receiptController/receipt-controller");
const router = express.Router();

// router.post("/crt");
router.get("/src", allReciepts);
router.get("/src/:id", showSingleReceipt);
router.get("/cancl/:id", cancelReciepts);
// router.get("/del/:id");

module.exports = router;

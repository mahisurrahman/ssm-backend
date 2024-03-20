const express = require("express");
const { allReciepts } = require("../../controllers/receiptController/receipt-controller");
const router = express.Router();

// router.post("/crt");
router.get("/src", allReciepts);
// router.get("/src/:id");
// router.get("/del/:id");

module.exports = router;

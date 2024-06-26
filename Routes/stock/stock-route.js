const express = require("express");
const router = express.Router();

const {
  createStock,
  updateStock,
  increaseStock,
  decreaseStock,
  showStock,
  showSingleStock,
  removeStock,
  showAllStock,
} = require("../../controllers/stockControllers/stock-controllers");

//Routes//
router.post("/crt", createStock);
router.post("/src/all", showAllStock);
router.post("/upt/:id", updateStock);
router.post("/upt-incr/:id", increaseStock);
router.post("/upt-dec/:id", decreaseStock);
router.get("/src", showStock);
router.get("/src/:id", showSingleStock);
router.get("/del/:id", removeStock);

module.exports = router;

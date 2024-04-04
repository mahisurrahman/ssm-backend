const express = require("express");
const router = express.Router();
const {
  createProducts,
  showProducts,
  showAllProducts,
  removeProduct,
  showSingleProduct,
  updateAProductInfo,
  updateAProductPrice,
} = require("../../controllers/productControllers/product-controllers.js");

router.post("/crt", createProducts);
router.get("/src", showProducts);
router.get("/src/all", showAllProducts);
router.get("/src/:id", showSingleProduct);
router.get("/del/:id", removeProduct);
router.post("/upt/:id", updateAProductInfo);
router.post("/upt/price/:id", updateAProductPrice);

module.exports = router;

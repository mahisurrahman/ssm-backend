const express = require('express');
const router = express.Router();
const {createProducts, showProducts} = require('../../controllers/productControllers/product-controllers.js');

// router.use('/').post(postProducts);s
router.post("/crt", createProducts);
router.get("/src/", showProducts);


module.exports = router;
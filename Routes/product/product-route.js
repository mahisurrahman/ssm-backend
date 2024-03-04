const express = require('express');
const router = express.Router();
const {createProducts} = require('../../controllers/productControllers/product-controllers.js');

// router.use('/').post(postProducts);s
router.post("/crt", createProducts)

module.exports = router;
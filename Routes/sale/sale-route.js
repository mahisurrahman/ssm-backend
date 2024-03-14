const express = require('express');
const router = express.Router();
const {registerSales} = require ('../../controllers/saleController/sale-controller.js');

router.post('/crt', registerSales );

module.exports = router;
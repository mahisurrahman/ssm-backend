const express = require('express');
const router = express.Router();

const { createStock, updateStock } = require('../../controllers/stockControllers/stock-controllers');

//Routes//
router.post('/crt/:id', createStock);
router.post('/upt/:id', updateStock);

module.exports = router;

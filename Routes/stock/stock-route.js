const express = require('express');
const router = express.Router();

const { createStock, updateStock, increaseStock, decreaseStock } = require('../../controllers/stockControllers/stock-controllers');

//Routes//
router.post('/crt/:id', createStock);
router.post('/upt/:id', updateStock);
router.post('/upt-add/:id', increaseStock);
router.post('/upt-dec/:id', decreaseStock);

module.exports = router;

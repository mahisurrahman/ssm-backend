const express = require('express');
const router = express.Router();

const { createStock, updateStock, increaseStock, decreaseStock, showStock, showSingleStock, removeStock } = require('../../controllers/stockControllers/stock-controllers');

//Routes//
router.post('/crt/:id', createStock);
router.post('/upt/:id', updateStock);
router.post('/upt-add/:id', increaseStock);
router.post('/upt-dec/:id', decreaseStock);
router.get('/src', showStock);
router.get('/src/:id', showSingleStock);
router.get('/del/:id', removeStock);

module.exports = router;

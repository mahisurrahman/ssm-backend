const express = require('express');
const router = express.Router();
const {createProducts, showProducts, removeProduct, showSingleProduct, updateAProduct} = require('../../controllers/productControllers/product-controllers.js');

// router.use('/').post(postProducts);s
router.post("/crt", createProducts);
router.get("/src", showProducts);
router.get('/del/:id', removeProduct);
router.get('/src/:id', showSingleProduct);
router.post('/upt/:id', updateAProduct);


module.exports = router;
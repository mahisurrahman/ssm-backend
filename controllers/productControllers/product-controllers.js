const productServices = require("../../core/services/product/productService.js");

//Create a Single Product//
const createProducts = async (req, res) => {
  try {
    const response = await productServices.productCreation(req.body);
    return res.send({ response });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Show All Products//
const showProducts = async (req, res) => {
  try {
    const response = await productServices.showAllProducts();
    return res.send({ response });
  } catch (error) {
    console.error(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Show a Single Product//
const showSingleProduct = async (req, res) => {
  try {
    const response = await productServices.showSingleProd(req);
    return res.send({ response });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Remove a Single Product//
const removeProduct = async (req, res) => {
  try {
    const response = await productServices.removeSingleProd(req);
    return res.send({ response });
  } catch (error) {
    console.error(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Update a Product Info//
const updateAProductInfo = async (req, res) => {
  try {
    const uptInfo = req.body;
    const prodId = req.params.id;
    const response = await productServices.updateSingleProd(uptInfo, prodId);
    return res.send({ response });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Update a Product Price//
const updateAProductPrice = async (req, res) => {
  try {
    const prodId = req.params.id;
    const uptInfo = req.body;
    const response = await productServices.updatePriceOfAProd(uptInfo, prodId);
    return res.send({response});
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

module.exports = {
  showProducts,
  createProducts,
  removeProduct,
  showSingleProduct,
  updateAProductInfo,
  updateAProductPrice,
};

const stockServices = require ('../../core/services/stocks/stockService.js');

//Create Stock//
const createStock = async (req, res) => {
  try {
    const data = req.body;
    const response = await stockServices.stockCreation(data);
    return res.send({response});
  } catch (err) {
    console.error(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

// Update A Single Product Stock//
const updateStock = async (req, res) => {
  try {
    const response = await stockServices.stockUpdate(req.body, req.params);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Update Stock by Adding Value//
const increaseStock = async (req, res) => {
  try {
    const response = await stockServices.stockIncrease(req.body.stockQuantity, req.params);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send({
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Update Stock by Reducing Value//
const decreaseStock = async (req, res) => {
  try {
    const response = await stockServices.stockDecrease(req.body.stockQuantity, req.params);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send({
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Show all Stock Values//
const showStock = async (req, res) => {
  try {
    const response = await stockServices.displayStock();
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send({
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Show single Stock Values//
const showSingleStock = async (req, res) => {
  try {
    const response = await stockServices.displaySingleStock(req.params);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
};

//Delete Single Stock Values//
const removeStock = async (req, res) => {
  try {
    const response = await stockServices.removeSingleStock(req.params);
    return res.send(response);
  } catch (err) {
    return res.status(500).send({
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

module.exports = {
  createStock,
  updateStock,
  increaseStock,
  decreaseStock,
  showStock,
  showSingleStock,
  removeStock,
};

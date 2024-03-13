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
    const id = req.params.id;
    const newStockAmount = req.body.stockQuantity;
    const result = await Stocks.find({ productId: id });
    const output = result[0].stockQuantity;
    const updatedData = await Stocks.updateOne({
      $set: {
        stockQuantity: output - newStockAmount,
      },
    });

    if (result && updatedData) {
      return res.send({
        status: 200,
        error: false,
        message: "Success",
        data: result,
      });
    } else {
      return res.send({
        status: 404,
        error: true,
        message: "Failed",
        data: null,
      });
    }
  } catch (err) {
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
    const result = await Stocks.find({
      isDeleted: false,
    });
    if (result) {
      return res.send({
        status: 200,
        error: false,
        message: "Success",
        data: result,
      });
    } else {
      return res.send({
        status: 404,
        error: true,
        message: "Failed",
        data: null,
      });
    }
  } catch (err) {
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
    const id = req.params.id;
    const productId = await Stocks.find({
      productId: id,
      isDeleted: false,
    });
    if (productId && productId.length !== 0) {
      return res.send({
        status: 200,
        error: false,
        message: "Success",
        data: productId,
      });
    } else {
      return res.send({
        status: 404,
        error: true,
        message: "Data not found",
        data: null,
      });
    }
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
    const id = req.params.id;
    const productDetails = await Stocks.findOneAndUpdate(
      { productId: id, isDeleted: false },
      {
        $set: {
          isDeleted: true,
          isActive: false,
          deletedDate: Date.now(),
        },
      },
      { new: true }
    );

    if (productDetails) {
      return res.send({
        status: 200,
        error: false,
        message: "Success",
        data: null,
      });
    } else {
      return res.status(404).send({
        error: true,
        message: "Stock not found or already deleted",
        data: null,
      });
    }
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

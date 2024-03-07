const { ObjectId } = require("mongodb");
const Stocks = require("../../models/stock-model");
const { Products } = require("../productControllers/product-controllers");

//Create Stock//
const createStock = async (req, res) => {
  try {
    const stockCount = req.body;
    const productId = req.params.id;
    if (!stockCount || !productId) {
      return res.send({
        satus: 204,
        error: true,
        message: "Input Missing",
        data: null,
      });
    }
    let stockValue = parseInt(stockCount);
    const result = await Stocks.create({
      productId: productId,
      stockQuantity: stockValue,
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
    console.error(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Update A Single Product Stock//
const updateStock = async (req, res) => {
  try {
    const id = req.params.id;
    const newStockAmount = req.body.stockQuantity;
    const result = await Stocks.find({ productId: id });
    const output = result[0].stockQuantity;
    const updatedData = await Stocks.updateOne({
      $set: {
        stockQuantity: newStockAmount,
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
    const id = req.params.id;
    const newStockAmount = req.body.stockQuantity;
    const result = await Stocks.find({ productId: id });
    const output = result[0].stockQuantity;
    const updatedData = await Stocks.updateOne({
      $set: {
        stockQuantity: output + newStockAmount,
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
    console.log(output);
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
    const productId = await Stocks.findOne({ productId: id });
    if (productId) {
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
        message: "Failed",
        data: null,
      });
    }
  } catch (err) {
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
  };
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

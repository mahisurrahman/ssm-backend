const Stocks = require("../../../models/stock-model");

//Creating Stock//
const stockCreation = async (data) => {
  try {
    const stockQuantity = data.stockQuantity;
    const prodId = data.prodId;
    if (!stockQuantity || !prodId) {
      return {
        satus: 204,
        error: true,
        message: "Input Missing",
        data: null,
      };
    }
    let stockValue = parseInt(stockQuantity);
    const existsData = await Stocks.findOne({
      productId: prodId,
      isDeleted: false,
    });
    if (existsData) {
      return {
        status: 400,
        error: true,
        message: "Bad request",
        data: null,
      };
    } else {
      const result = await Stocks.create({
        productId: prodId,
        stockQuantity: stockQuantity,
      });
      if (result) {
        return {
          status: 200,
          error: false,
          message: "Success",
          data: result,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed",
          data: null,
        };
      }
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

//Stock Update//
const stockUpdate = async (body, prodId) => {
  try {
    const id = prodId.id;
    const newStockAmount = body.stockQuantity;
    const result = await Stocks.findOneAndUpdate(
      {
        productId: id,
        isDeleted: false,
      },
      {
        $set: {
          stockQuantity: newStockAmount,
        },
      }
    );
    if (result) {
      return {
        status: 200,
        error: false,
        message: "Success",
        data: true,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Failed",
        data: null,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

//Stock Increasing//
const stockIncrease = async (data, prodId) => {
  try {
    const id = prodId.id;
    const newStockAmount = data;
    console.log(newStockAmount);
    const result = await Stocks.findOne({ productId: id, isDeleted: false });
    console.log(result);
    const updatedData = await Stocks.updateOne(
      {
        productId: id
      },
      {
      $set: {
        stockQuantity: result.stockQuantity + newStockAmount,
      },
    });
    console.log(updatedData);
    if (result && updatedData) {
      return {
        status: 200,
        error: false,
        message: "Success",
        data: true,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Failed",
        data: null,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

module.exports = { stockCreation, stockUpdate, stockIncrease };

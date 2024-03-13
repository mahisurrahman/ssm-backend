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
        stockQuantity: stockValue,
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
    const result = await Stocks.findOne({ productId: id, isDeleted: false });
    const updatedData = await Stocks.updateOne(
      {
        productId: id,
      },
      {
        $set: {
          stockQuantity: result.stockQuantity + newStockAmount,
        },
      }
    );
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

//Stcok Descreasing//
const stockDecrease = async (data, prodId) => {
  try {
    const id = prodId.id;
    const newStockAmount = data;
    const result = await Stocks.findOne({ productId: id, isDeleted: false });
    const updatedData = await Stocks.updateOne(
      {
        productId: id,
      },
      {
        $set: {
          stockQuantity: result.stockQuantity - newStockAmount,
        },
      }
    );
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

//Display Stock//
const displayStock = async () => {
  try {
    const result = await Stocks.find({
      isDeleted: false,
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
  } catch (err) {
    console.log(err);
    return {
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

//Display Single Stock Values//
const displaySingleStock = async (prodId) => {
  try {
    const id = prodId.id;
    const productId = await Stocks.find({
      productId: id,
      isDeleted: false,
    });
    if (productId && productId.length !== 0) {
      return {
        status: 200,
        error: false,
        message: "Success",
        data: productId,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Data not found",
        data: null,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

//Remove Single Stock//
const removeSingleStock = async (prodId) => {
  try {
    const id = prodId.id;
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
      return{
        status: 200,
        error: false,
        message: "Success",
        data: null,
      };
    } else {
      return{
        error: true,
        message: "Stock not found or already deleted",
        data: null,
      };
    }
  } catch (err) {
    console.log(err);
    return{
      stauts: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    };
  }
};

module.exports = {
  stockCreation,
  stockUpdate,
  stockIncrease,
  stockDecrease,
  displayStock,
  displaySingleStock,
  removeSingleStock
};

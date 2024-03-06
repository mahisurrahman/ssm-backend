const Stocks = require("../../models/stock-model");

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
    return res.send({
      status: 200,
      error: false,
      message: "Success",
      data: result,
    });
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
    const filter = { productId: id };
    const newStockAmount = req.body.stockQuantity;
    const updatedData = {
      $set: {
        stockQuantity: newStockAmount,
      },
    };
    const result = await Stocks.updateOne(filter, updatedData);
    return res.send({
      status: 200,
      err: false,
      message: "success",
      data: result,
    });
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
  try{
      const id = req.params.id;
      const filter = { productId: id};
      const newStockAmount = req.body.stockQuantity;
      const updatedData = {
        $set: {
          stockQuantity: stockQuantity + newStockAmount
        },
      };
      const result = await Stocks.updateOne(filter, updatedData);
      return res.send({
        status: 200,
        err: false,
        message: "Success",
        data: result,
      })
  }catch(err){
    return res.send({
        stauts: 500,
        error: true, 
        message: "Internal Server Error",
        data: err,
    })
  }
};

//Update Stock by Reducing Value//
const decreaseStock = async (req, res) => {
  try{
      const id = req.params.id;
      const filter = { productId: id};
      const newStockAmount = req.body.stockQuantity;
      const updatedData = {
        $set: {
          stockQuantity: stockQuantity - newStockAmount
        },
      };
      const result = await Stocks.updateOne(filter, updatedData);
      return res.send({
        status: 200,
        err: false,
        message: "Success",
        data: result,
      })
  }catch(err){
    return res.send({
        stauts: 500,
        error: true, 
        message: "Internal Server Error",
        data: err,
    })
  }
};

module.exports = { createStock, updateStock, increaseStock, decreaseStock };

const Reciepts = require("../../../models/receipt-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const Sales = require("../../../models/sales-model");

//Generate Receipt//
const generateReciept = async (dataArray) => {
  try {
    // dataArray.map((d) => {
    //   d._id = d._id.toString();
    //   let salesId = d._id;
    // });

    let tLoss = 0;
    let tProf = 0;
    for (let product of dataArray) {
      if (product.profit > 0) {
        tProf = tProf + product.profit;
      } else {
        tLoss = tLoss + product.loss;
      }
    }

    const receipts = await Reciepts.create({
      totalLoss: tLoss,
      totalProfit: tProf,
      soldProducts: dataArray,
    });

    if (receipts) {
      return {
        status: 200,
        error: false,
        message: "Receipt Added",
        data: receipts,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Receipt wasn't added",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

//Show All Reciepts//
const showReciepts = async () => {
  try {
    const result = await Reciepts.find({ isDeleted: false });
    return {
      status: 200,
      error: false,
      message: "Success",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

module.exports = { generateReciept, showReciepts };

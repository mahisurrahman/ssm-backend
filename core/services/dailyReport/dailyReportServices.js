const Sales = require("../../../models/sales-model");
const Products = require("../../../models/sales-model");
const Stocks = require("../../../models/stock-model");
const Receipts = require("../../../models/receipt-model");
const DailyRprt = require("../../../models/dailyReport-model");

//Generate Sales//
const newDailyReport = async (salesCreated) => {
  try {
    let updateDailyRprt = null;
    let createDailyReport = null;
    for (let item of salesCreated) {
      let productExists = await DailyRprt.findOne({
        productId: item.productId,
      });

      let prvBuyPrice = 0;
      let totalBuyPrice = 0;
      let prvSellingPrice = 0;
      let totalSellingPrice = 0;
      let totalProfit = 0;
      let totalLoss = 0;
      let totalQtySold = 0;

      if (productExists !== null) {
        let prvBuyPrice = item.buyingPrice * item.quantitySold;
        let totalBuyPrice = productExists.totalBuyingPrice + prvBuyPrice;

        let prvSellingPrice = item.sellingPrice * item.quantitySold;
        let totalSellingPrice =
          productExists.totalSellingPrice + prvSellingPrice;

        let totalProfit = productExists.totalProfit + item.profit;
        let totalLoss = productExists.totalLoss + item.loss;

        let totalQtySold = productExists.totalQuantitySold + item.quantitySold;

        let updateDailyRprt = await DailyRprt.findOneAndUpdate(
          { productId: item.productId },
          {
            totalBuyingPrice: totalBuyPrice,
            totalSellingPrice: totalSellingPrice,
            totalProfit: totalProfit,
            totalLoss: totalLoss,
            totalQuantitySold: totalQtySold,
          },
          {
            new: true,
          }
        );
      } else {
        let createDailyReport = await DailyRprt.create({
          productId: item.productId,
          productName: item.productName,
          totalBuyingPrice: item.buyingPrice * item.quantitySold,
          totalSellingPrice: item.sellingPrice * item.quantitySold,
          totalProfit: item.profit,
          totalLoss: item.loss,
          totalQuantitySold: item.quantitySold,
        });
      }
    }

    if (updateDailyRprt && createDailyReport !== null) {
      return {
        status: 200,
        error: false,
        message: "Success - Added the Daily Report",
        data: null,
      };
    } else {
      return {
        status: 409,
        error: true,
        message: "Failed - Failed to Add the Daily Report",
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

module.exports = { newDailyReport };

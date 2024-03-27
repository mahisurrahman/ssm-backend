const Sales = require("../../../models/sales-model");
const Products = require("../../../models/sales-model");
const Stocks = require("../../../models/stock-model");
const Receipts = require("../../../models/receipt-model");
const DailyRprt = require("../../../models/dailyReport-model");

//Generate Sales//
const newDailyReport = async (salesCreated) => {
  // try {
  //   let updateDailyRprt = null;
  //   let createDailyReport = null;
  //   for (let item of salesCreated) {
  //     //for current date
  //     let productExists = await DailyRprt.findOne({
  //       productId: item.productId,
  //     });
  //     let newBuyPrice = 0;
  //     let totalBuyPrice = 0;
  //     let newSellingPrice = 0;
  //     let totalSellingPrice = 0;
  //     let totalProfit = 0;
  //     let totalLoss = 0;
  //     let totalQtySold = 0;
  //     let prev;
  //     if (productExists !== null) {
  //       //update
  //       let newBuyPrice = item.buyingPrice * item.quantitySold;
  //       let totalBuyPrice = productExists.totalBuyingPrice + newBuyPrice;
  //       let newSellingPrice = item.sellingPrice * item.quantitySold;
  //       let totalSellingPrice =
  //         productExists.totalSellingPrice + newSellingPrice;
  //       let totalQtySold = productExists.totalQuantitySold + item.quantitySold;
  //       let profAmount = 0;
  //       let lossAmount = 0;
  //       let difference = 0;
  //       if (totalBuyPrice > totalSellingPrice) {
  //         let difference = totalBuyPrice - totalSellingPrice;
  //         profAmount = difference * totalQtySold;
  //       } else {
  //         let difference = totalSellingPrice - totalBuyPrice;
  //         lossAmount = difference * totalQtySold;
  //       }
  //       let updateDailyRprt = await DailyRprt.findOneAndUpdate(
  //         { productId: item.productId },
  //         {
  //           totalBuyingPrice: totalBuyPrice,
  //           totalSellingPrice: totalSellingPrice,
  //           totalProfit: profAmount,
  //           totalLoss: lossAmount,
  //           totalQuantitySold: totalQtySold,
  //         },
  //         {
  //           new: true,
  //         }
  //       );
  //     } else {
  //       //create
  //       let createDailyReport = await DailyRprt.create({
  //         productId: item.productId,
  //         productName: item.productName,
  //         totalBuyingPrice: item.buyingPrice * item.quantitySold,
  //         totalSellingPrice: item.sellingPrice * item.quantitySold,
  //         totalProfit: item.profit,
  //         totalLoss: item.loss,
  //         totalQuantitySold: item.quantitySold,
  //       });
  //     }
  //   }
  //   if (updateDailyRprt || createDailyReport !== null) {
  //     return {
  //       status: 200,
  //       error: false,
  //       message: "Success - Added the Daily Report",
  //       data: null,
  //     };
  //   } else {
  //     return {
  //       status: 409,
  //       error: true,
  //       message: "Failed - Failed to Add the Daily Report",
  //       data: null,
  //     };
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     status: 500,
  //     error: true,
  //     message: "Internal Server Error",
  //     data: error,
  //   };
  // }
};

//Show All Daily Reports//
const showDailyReports = async () => {
  try {
    const allReports = await DailyRprt.find({ isDeleted: false });
    return {
      status: 200,
      error: false,
      message: "Success - Shown All Reports",
      data: null,
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

//Show Single Daily Reports//
const showSingleDailyReports = async (data) => {
  try {
    const singleReport = await DailyRprt.findOne({
      _id: data.id,
      isDeleted: false,
    });

    if (singleReport) {
      return {
        status: 200,
        error: false,
        message: "Success - Single Daily Report Shown",
        data: singleReport,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Failed - Can't Found the Desired Sales Report",
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

//Delete Single Sale Reports//
const deleteSingleDailyReport = async (data) => {
  try {
    const removeReport = await DailyRprt.findOneAndUpdate(
      { _id: data.id, isDeleted: false },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
    if (removeReport) {
      return {
        status: 200,
        error: false,
        message: "Success - Daily Sale Removed",
        data: null,
      };
    } else {
      return {
        status: 409,
        error: true,
        message: "Failed - Daily Sale Wasn't Removed",
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

module.exports = {
  newDailyReport,
  showDailyReports,
  showSingleDailyReports,
  deleteSingleDailyReport,
};

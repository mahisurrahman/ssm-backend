const Sales = require("../../../models/sales-model");
const Products = require("../../../models/sales-model");
const Stocks = require("../../../models/stock-model");
const Receipts = require("../../../models/receipt-model");
const DailyRprt = require("../../../models/dailyReport-model");

//Generate Sales//
const newDailyReport = async (soldProduct) => {
  try {
    console.log(soldProduct);
    const productId = soldProduct.productId;

    const findOldData = await DailyRprt.findOne({ productId: productId });

    if (findOldData !== null) {
      let prevTotalProfit = findOldData.totalProfit;
      let prevTotalLoss = findOldData.totalLoss;
      let prevQtySold = findOldData.totalQuantitySold;
      let prevBuyingPrice = findOldData.totalBuyingPrice;
      let prevSellingPrice = findOldData.totalSellingPrice;
      let totalProf = 0;
      let totalLoss = 0;
      let finalProf = 0;
      let finalLoss = 0;
      let calcValue = 0;

      let totalQty = prevQtySold + soldProduct.quantitySold;
      let totalBuyCost = prevBuyingPrice + soldProduct.buyingPrice;
      let totalSellCost = prevSellingPrice + soldProduct.sellingPrice;

      if (soldProduct.profit > 0) {
        if (prevTotalProfit > 0) {
          totalProf = prevTotalProfit + soldProduct.profit;
        } else if (prevTotalLoss > 0) {
          calcValue = soldProduct.profit - prevTotalLoss;
          prevTotalLoss = 0;
          if (totalProf < 0) {
            totalLoss = calcValue;
          } else {
          }
        }
      } else if (soldProduct.loss > 0) {
        if (prevTotalLoss > 0) {
          totalLoss = prevTotalLoss + soldProduct.loss;
        } else if (prevTotalProfit > 0) {
          totalLoss = soldProduct.loss - prevTotalProfit;
          prevTotalProfit = 0;
        }
      }
      const updateDailyRprt = await DailyRprt.updateOne(
        { productId: soldProduct.productId },
        {
          totalBuyingPrice: totalBuyCost,
          totalSellingPrice: totalSellCost,
          totalProfit: totalProf,
          totalLoss: totalLoss,
          totalQuantitySold: totalQty,
        },
        { new: true }
      );

      if (updateDailyRprt) {
        return {
          status: 200,
          error: false,
          message: "Successfully Handled the Daily Report",
          data: updateDailyRprt,
        };
      } else {
        return {
          status: 409,
          error: false,
          message: "Failed - to update the Daily Report",
          data: null,
        };
      }
    } else {
      const createDailyReport = await DailyRprt.create({
        productId: productId,
        productName: soldProduct.productName,
        totalBuyingPrice: soldProduct.buyingPrice,
        totalSellingPrice: soldProduct.sellingPrice,
        totalProfit: soldProduct.profit,
        totalLoss: soldProduct.loss,
        totalQuantitySold: soldProduct.quantitySold,
      });

      if (createDailyReport) {
        return {
          status: 200,
          error: false,
          message: "Successfully Created the Daily Report",
          data: null,
        };
      } else {
        return {
          status: 409,
          error: true,
          message: "Failed to Create the Daily Report",
          data: null,
        };
      }
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

// let updateDailyRprt = null;
//     let createDailyReport = null;
//     for (let item of salesCreated) {
//       //for current date
//       let productExists = await DailyRprt.findOne({
//         productId: item.productId,
//       });

//       let newBuyPrice = 0;
//       let totalBuyPrice = 0;
//       let newSellingPrice = 0;
//       let totalSellingPrice = 0;
//       let totalProfit = 0;
//       let totalLoss = 0;
//       let totalQtySold = 0;
//       let prev;

//       if (productExists !== null) {
//         //update
//         let newBuyPrice = item.buyingPrice * item.quantitySold;
//         let totalBuyPrice = productExists.totalBuyingPrice + newBuyPrice;

//         let newSellingPrice = item.sellingPrice * item.quantitySold;
//         let totalSellingPrice =
//           productExists.totalSellingPrice + newSellingPrice;

//         let totalQtySold = productExists.totalQuantitySold + item.quantitySold;

//         let totalProfit = 0;
//         let totalLoss = 0;
//         if (item.profit > 0) {
//           totalProfit += item.profit;
//         } else {
//           totalLoss += item.loss;
//         }

//         const reportData = {
//           totalBuyingPrice: totalBuyPrice,
//           totalSellingPrice: totalSellingPrice,
//           totalQuantitySold: totalQtySold,
//         };

//         let totalCalc = 0;
//         if (totalProfit > totalLoss) {
//           totalCalc = totalProfit - totalLoss;
//           reportData.totalProfit = totalCalc;
//         } else if (totalLoss > totalProfit) {
//           totalCalc = totalLoss - totalProfit;
//           reportData.totalLoss = totalCalc;
//         } else if (totalLoss === totalProfit) {
//           totalCalc = 0;
//           reportData.totalProfit = totalCalc;
//           reportData.totalLoss = totalCalc;
//         }

//         let updateDailyRprt = await DailyRprt.findOneAndUpdate(
//           { productId: item.productId },
//           reportData,
//           {
//             new: true,
//           }
//         );

//         if (updateDailyRprt) {

//         }
//       } else {
//         //create
//         let createDailyReport = await DailyRprt.create({
//           productId: item.productId,
//           productName: item.productName,
//           totalBuyingPrice: item.buyingPrice * item.quantitySold,
//           totalSellingPrice: item.sellingPrice * item.quantitySold,
//           totalProfit: item.profit,
//           totalLoss: item.loss,
//           totalQuantitySold: item.quantitySold,
//         });
//       }
//     }

//     if (updateDailyRprt || createDailyReport !== null) {
//       return {
//         status: 200,
//         error: false,
//         message: "Success - Added the Daily Report",
//         data: null,
//       };
//     } else {
//       return {
//         status: 409,
//         error: true,
//         message: "Failed - Failed to Add the Daily Report",
//         data: null,
//       };
//     }

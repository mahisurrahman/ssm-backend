const Sales = require("../../../models/sales-model");
const Products = require("../../../models/sales-model");
const Stocks = require("../../../models/stock-model");
const Receipts = require("../../../models/receipt-model");
const DailyRprt = require("../../../models/dailyReport-model");

//Generate Sales//
const newDailyReport = async (soldProduct) => {
  try {
    const productId = soldProduct.productId;
    // const today = new Date();
    // const yesterday = new Date(today);
    // yesterday.setDate(yesterday.getDate() - 1);
    // yesterday.setHours(0, 0, 0, 0);
    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // tomorrow.setHours(0, 0, 0, 0);
    // console.log(yesterday, "yesterday");
    // console.log(tomorrow, "tomorrow");

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tom = new Date();
    tom.setHours(23, 59, 59, 999);
    // console.log(today.toISOString(), "today");
    // console.log(tom.toISOString(), "tom");

    const findOldData = await DailyRprt.findOne({
      productId: productId,
      createDate: { $gte: today, $lte: tom },
    });
    // console.log(findOldData);
    if (findOldData !== null) {
      let prevQtySold = findOldData.totalQuantitySold;
      let prevBuyingPrice = findOldData.totalBuyingPrice;
      let prevSellingPrice = findOldData.totalSellingPrice;

      let totalQty = prevQtySold + soldProduct.quantitySold;
      let defaultBuyCost = soldProduct.buyingPrice * totalQty;
      let totalBuyCost = defaultBuyCost + prevBuyingPrice;
      let defaultSellCost = soldProduct.sellingPrice * totalQty;
      let totalSellCost = defaultSellCost + prevSellingPrice;

      const dailyReportData = {
        totalBuyingPrice: totalBuyCost,
        totalSellingPrice: totalSellCost,
        totalQuantitySold: totalQty,
      };

      if (totalBuyCost > totalSellCost) {
        totalLoss = totalBuyCost - totalSellCost;
        dailyReportData.totalLoss = totalLoss;
        dailyReportData.totalProfit = 0;
      } else if (totalSellCost > totalBuyCost) {
        totalProf = totalSellCost - totalBuyCost;
        dailyReportData.totalProfit = totalProf;
        dailyReportData.totalLoss = 0;
      } else if (totalBuyCost == totalSellCost) {
        dailyReportData.totalProfit = 0;
        dailyReportData.totalLoss = 0;
      }

      const updateDailyRprt = await DailyRprt.updateOne(
        { productId: soldProduct.productId },
        dailyReportData,
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
      let totalPordQty = soldProduct.quantitySold;
      let totalBuyAmnt = soldProduct.buyingPrice * totalPordQty;
      let totalSellAmnt = soldProduct.sellingPrice * totalPordQty;

      const dailyReportData = {
        productId: productId,
        productName: soldProduct.productName,
        totalBuyingPrice: totalBuyAmnt,
        totalSellingPrice: totalSellAmnt,
        totalQuantitySold: totalPordQty,
      };

      if (totalBuyAmnt > totalSellAmnt) {
        let totalLoss = totalBuyAmnt - totalSellAmnt;
        dailyReportData.totalLoss = totalLoss;
        dailyReportData.totalProfit = 0;
      } else if (totalSellAmnt > totalBuyAmnt) {
        let totalProf = totalSellAmnt - totalBuyAmnt;
        dailyReportData.totalProfit = totalProf;
        dailyReportData.totalLoss = 0;
      } else if (totalBuyAmnt == totalSellAmnt) {
        dailyReportData.totalProfit = 0;
        dailyReportData.totalLoss = 0;
      }

      const createDailyReport = await DailyRprt.create(dailyReportData);

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
    const allReports = await DailyRprt.find();
    return {
      status: 200,
      error: false,
      message: "Success - Shown All Reports",
      data: allReports,
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

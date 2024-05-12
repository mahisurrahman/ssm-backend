const Reciepts = require("../../../models/receipt-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const Sales = require("../../../models/sales-model");
const DailyRprt = require("../../../models/dailyReport-model");
const dailyRportServices = require("../dailyReport/dailyReportServices");
const { uuid } = require("uuidv4");

//Generate Receipt//
const generateReciept = async (salesCreated) => {
  try {
    if (salesCreated.length <= 0) {
      return {
        status: 400,
        error: true,
        message: "Invalid Sold Quantity",
        data: null,
      };
    }
    const recieptNumber = uuid();
    let totalProfit = 0;
    let totalLoss = 0;

    for (let product of salesCreated) {
      if (product.profit > 0) {
        totalProfit += product.profit;
      } else {
        totalLoss += product.loss;
      }
    }

    const receiptData = {
      receiptKey: recieptNumber,
      soldProducts: salesCreated,
    };

    let totalCalc = 0;
    if (totalProfit > totalLoss) {
      totalCalc = totalProfit - totalLoss;
      receiptData.totalProfit = totalCalc;
    } else if (totalLoss > totalProfit) {
      totalCalc = totalLoss - totalProfit;
      receiptData.totalLoss = totalCalc;
    } else if (totalLoss === totalProfit) {
      totalCalc = 0;
      receiptData.totalLoss = 0;
      receiptData.totalProfit = 0;
    }

    const receipts = await Reciepts.create(receiptData);

    if (receipts) {
      let generateDailyReport = null;
      for (let product of salesCreated) {
        let generateDailyReport = await dailyRportServices.newDailyReport(
          product
        );
      }
      if (generateDailyReport !== null) {
        return {
          status: 200,
          error: false,
          message: "Success",
          data: null,
        };
      } else {
        return {
          status: 409,
          error: true,
          message: "Failed",
          data: null,
        };
      }
    } else {
      return {
        status: 400,
        error: true,
        message: "Failed !!!",
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
    if(result){
      return {
        status: 200,
        error: false,
        message: "Success",
        data: result,
      };
    }else{
      return{
        status: 404,
        error: true,
        message: "No receipts found",
        data: null,
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

//Show Single Receipts//
const showSingleReceipts = async (data) => {
  console.log(data);
  try {
    const receiptId = data.id;
    const result = await Reciepts.findOne({
      _id: receiptId,
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
        message: "Failed -- Receipts not Found",
        data: null,
      };
    }
  } catch (error) {
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

//Cancel Receipts//
const removeReceipts = async (data) => {
  try {
    const receiptKey = data.receiptKey;
    if (!receiptKey) {
      return {
        status: 409,
        error: true,
        message: "Receipt Key Not Found",
        data: null,
      };
    }
    let receiptDetails = await Reciepts.findOne({
      receiptKey: receiptKey,
      isDeleted: false,
    });

    if (!receiptDetails) {
      return {
        status: 409,
        error: true,
        message: "Invalid Receipt Key or Receipt Data Not Found",
      };
    }

    //Getting Sales and Product's Id//
    let soldProds = [];
    for (let prod of receiptDetails.soldProducts) {
      soldProds.push(prod);
    }

    //Updating Stock Info//
    let prevQty = 0;
    for (let info of soldProds) {
      let productId = info.productId;
      let quantitySold = info.quantitySold;

      let stockInfo = await Stocks.findOne({
        productId: productId,
        isDeleted: false,
      });
      let stockId = stockInfo._id.toString();
      if (stockInfo) {
        prevQty = stockInfo.stockQuantity;
        let stockDecrease = await Stocks.findByIdAndUpdate(
          { _id: stockId },
          {
            stockQuantity: prevQty + quantitySold,
          }
        );

        if (stockDecrease) {
          //Removing the Sales//
          for (let info of soldProds) {
            let salesId = info.salesId;
            console.log(salesId);
            let salesInfo = await Sales.findOneAndUpdate(
              {
                _id: salesId,
                isDeleted: false,
              },
              { isDeleted: true }
            );

            if (salesInfo) {
              let removeReceipt = await Reciepts.findOneAndUpdate(
                {
                  receiptKey: receiptKey,
                  isDeleted: false,
                },
                {
                  isDeleted: true,
                }
              );
              if (removeReceipt) {
                return {
                  status: 200,
                  error: false,
                  message:
                    "Success - Stocks are Re-Stocked, sales and Receipts Removed",
                  data: null,
                };
              } else {
                return {
                  status: 403,
                  error: true,
                  message: "Failed the Operation",
                  data: null,
                };
              }
            } else {
              return {
                status: 409,
                error: true,
                message: "Sales Deletion didn't work",
                data: null,
              };
            }
          }
        } else {
          return {
            status: 409,
            error: true,
            message: "Stocks Deletion didn't work",
            data: null,
          };
        }
      } else {
        return {
          status: 409,
          error: true,
          message: "Stock Seach Operation Failed",
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

module.exports = {
  generateReciept,
  showReciepts,
  removeReceipts,
  showSingleReceipts,
};

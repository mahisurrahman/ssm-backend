const Reciepts = require("../../../models/receipt-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const Sales = require("../../../models/sales-model");
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
    let tLoss = 0;
    let tProf = 0;
    for (let product of salesCreated) {
      if (product.profit > 0) {
        tProf = tProf + product.profit;
      } else {
        tLoss = tLoss + product.loss;
      }
    }

    const receipts = await Reciepts.create({
      receiptKey: recieptNumber,
      totalLoss: tLoss,
      totalProfit: tProf,
      soldProducts: salesCreated,
    });

    if (receipts) {
      return {
        status: 200,
        error: false,
        message: "Success !!!",
        data: receipts,
      };
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

//Show Single Receipts//
const showSingleReceipts = async (data) => {
  console.log(data);
  try {
    const receiptId = data.id;
    const result = await Reciepts.findById(receiptId, { isDeleted: false });

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

//Cancel Receipts//
// const removeReceipts = async (data) => {
//   try {
//     const receiptId = data.receiptKey;
//     if (!receiptId) {
//       return {
//         status: 404,
//         error: true,
//         message: "Invalid Receipt Key",
//         data: null,
//       };
//     }

//     // const receiptDetails = await Reciepts.findOne({
//     //   receiptKey: receiptId,
//     //   isDeleted: false,
//     // });

//     if (!receiptDetails) {
//       return {
//         status: 404,
//         error: true,
//         message: "Receipt Not Found",
//         data: null,
//       };
//     }

//     let receiptProducts = [];
//     for (let products of receiptDetails.soldProducts) {
//       receiptProducts.push(products);
//     }

//     let prevQty = 0;
//     for (let item of receiptProducts) {
//       let stockDetails = await Stocks.findOne({ productId: item.productId });
//       prevQty = stockDetails.stockQuantity;

//       if (stockDetails) {
//         Stocks.updateOne(
//           { productId: item.productId },
//           {
//             stockQuantity: prevQty + item.quantitySold,
//           }
//         );

//         let result = await Sales.findOneAndUpdate(
//           { productId: item.productId },
//           {
//             $set: {
//               isDeleted: true,
//               isActive: false,
//               deletedDate: Date.now(),
//             },
//           },
//           {
//             new: true,
//           }
//         );
//         if (stockDetails && result) {
//           let removeReceipt = await Reciepts.findOneAndUpdate(
//             { _id: receiptId },
//             {
//               $set: {
//                 isDeleted: true,
//               },
//             }
//           );
//           if (removeReceipt) {
//             return {
//               status: 200,
//               error: false,
//               message: "Success - Receipt, Sales Removed and Stock Retrieved",
//               data: null,
//             };
//           } else {
//             return {
//               status: 403,
//               error: true,
//               message: "Failed - Receipt Failed to Remove",
//               data: null,
//             };
//           }
//         } else {
//           return {
//             status: 409,
//             error: true,
//             message: "Failed - Conflict",
//             data: null,
//           };
//         }
//       } else {
//         return {
//           status: 304,
//           error: true,
//           message: "Stock Details Operation Failed",
//           data: null,
//         };
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.send({
//       status: 500,
//       error: true,
//       message: "Internal Server Error",
//       data: error,
//     });
//   }
// };

module.exports = {
  generateReciept,
  showReciepts,
  removeReceipts,
  showSingleReceipts,
};

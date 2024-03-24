const Sales = require("../../../models/sales-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const stockServices = require("../stocks/stockService.js");
const receiptServices = require("../receipt/receiptServices.js");

//Validate Data before Pushing Data to Database//
const checkSalesData = async (sales) => {
  try {
    //Check User Has Given same product Id Twice or Not//
    const exists = {};
    for (let sale of sales) {
      if (!exists[sale.productId]) {
        exists[sale.productId] = {
          productId: sale.productId,
          sellingPrice: sale.sellingPrice,
          quantitySold: sale.quantitySold,
        };
      } else {
        return {
          status: 400,
          error: true,
          message: "Same Product Inserted Multiple Times",
          data: null,
        };
      }
    }

    //Check if the Quanity Sold is Zero or Not//
    for (let sale of sales) {
      if (sale.quantitySold <= 0) {
        return {
          status: 400,
          error: true,
          message: "Invalid Sold Quantity",
          data: null,
        };
      }
    }

    //Checking Stock Availability//
    for (let sale of sales) {
      let productStock = await Stocks.findOne({ productId: sale.productId });
      if (sale.quantitySold > productStock.stockQuantity) {
        return {
          status: 400,
          error: true,
          message: "Stock Quantity not Available",
          data: null,
        };
      }
    }

    let dataArray = [];
    for (let sale of sales) {
      let productDetails = await Products.findOne({ _id: sale.productId });
      let stockDetails = await Stocks.findOne({ productId: sale.productId });

      //Calculated Profit and Loss//
      let profitAmnt = 0;
      let lossAmnt = 0;
      if (sale.sellingPrice > productDetails.price) {
        profitAmnt =
          (sale.sellingPrice - productDetails.price) * sale.quantitySold;
      } else {
        lossAmnt =
          (productDetails.price - sale.sellingPrice) * sale.quantitySold;
      }

      //Wrapping the Data//
      let saleData = {
        productId: sale.productId,
        productName: productDetails.productName,
        stockQuantity: stockDetails.stockQuantity,
        quantitySold: sale.quantitySold,
        buyingPrice: productDetails.price,
        sellingPrice: sale.sellingPrice,
        totalProfit: profitAmnt,
        totalLoss: lossAmnt,
      };
      dataArray.push(saleData);
    }

    //Transfer the Data to the Create Sales Function//
    const transferData = await createSales(dataArray);
    return transferData;
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

//Create Sales//
const createSales = async (dataArray) => {
  try {
    let receiptInfo = null;
    let reduceStock = null;
    let salesCreated = [];
    for (let data of dataArray) {
      let generateSales = await Sales.create({
        productId: data.productId,
        quantitySold: data.quantitySold,
        sellingPrice: data.sellingPrice,
        buyingPrice: data.buyingPrice,
        profit: data.totalProfit,
        loss: data.totalLoss,
      });
      if (generateSales) {
        reduceStock = await stockServices.stockDecrease(
          data.quantitySold,
          data.productId
        );
        if (reduceStock) {
          let receiptInfo = {
            productName: data.productName,
            productId: data.productId,
            quantitySold: data.quantitySold,
            sellingPrice: data.sellingPrice,
            buyingPrice: data.buyingPrice,
            profit: data.totalProfit,
            loss: data.totalLoss,
            salesId: generateSales._id,
          };
          salesCreated.push(receiptInfo);
        } else {
          return {
            status: 304,
            error: true,
            message: "Not Modified - Failed to Transfer Data to Create Reciept",
            data: null,
          };
        }
      } else {
        return {
          status: 304,
          error: true,
          message: "Not Modified - Failed to Reduce The Stock",
          data: null,
        };
      }
    }

    if (reduceStock !== null) {
      let generateReceipt = await receiptServices.generateReciept(salesCreated);
      if (!generateReceipt.error) {
        return {
          status: 200,
          error: false,
          message: "Success - Added the Sales and the Reciept",
          data: generateReceipt,
        };
      } else {
        return {
          status: 304,
          error: true,
          message: "Not Modified - Failed to Generate Receipt",
          data: null,
        };
      }
    } else {
      return {
        status: 444,
        error: true,
        message: "this",
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

//Show all the Sales//
const showAllSales = async () => {
  try {
    const result = await Sales.find({ isDeleted: false });
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

//Show Individual Product Sales//
const showSingleSale = async (product) => {
  try {
    const productId = product.id;
    const result = await Sales.findOne({
      productId: productId,
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
        message: "Failed or Sales not Found",
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

// const removeSales = async (salesInfo) => {
//   try {
//     const salesId = salesInfo._id;
//     const result = await Sales.findOneAndUpdate(
//       {
//         _id: salesId,
//         isDeleted: false,
//       },
//       {
//         isDeleted: true,
//         isActive: false,
//         deletedDate: Date.now(),
//       }
//     );

//     if (result) {
//       return {
//         status: 200,
//         error: false,
//         message: "Success",
//         data: result,
//       };
//     } else {
//       return {
//         status: 404,
//         error: true,
//         message: "Failed to Delete Sales",
//         data: null,
//       };
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 500,
//       error: true,
//       message: "Internal Server Error",
//       data: error,
//     };
//   }
// };

module.exports = {
  checkSalesData,
  showAllSales,
  showSingleSale,
  // removeSales,
  createSales,
};

const Sales = require("../../../models/sales-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const stockServices = require("../stocks/stockService.js");
const receiptServices = require("../receipt/receiptServices.js");

//Validate Data before Pushing Data to Database//
const validateData = async (sales) => {
  const exists = {};
  for (const sale of sales) {
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
  let dataArray = [];

  for (const sale of sales) {
    for (const sale of sales) {
      if (sale.quantitySold === 0) {
        return {
          status: 400,
          error: true,
          message: "Quantity Sold Not Added",
          data: null,
        };
      }
    }

    for (const sale of sales) {
      let prodQty = await Stocks.findOne({ productId: sale.productId });
      if (sale.quantitySold > prodQty.stockQuantity) {
        return {
          status: 400,
          error: true,
          message: "Stock Quantity not Available",
          data: null,
        };
      }
    }

    let response = await createSales(sale);
    if (response.error !== true) {
      let receiptInfo = {
        productId: response.data.productId,
        productName: response.data.productName,
        quantitySold: response.data.quantitySold,
        sellingPrice: response.data.sellingPrice,
        buyingPrice: response.data.buyingPrice,
        profit: response.data.profit,
        loss: response.data.loss,
        salesId: response.data._id,
      };
      dataArray.push(receiptInfo);
    }
  }
  let receipt = await receiptServices.generateReciept(dataArray);

  if (receipt) {
    return {
      status: 200,
      error: false,
      message: "Successfully Added Sales",
      data: receipt,
    };
  } else {
    return {
      status: 400,
      error: true,
      message: "Failed to Proceed",
      data: null,
    };
  }
};

//Calculate Profit Or Loss//
const calcProfLoss = (bPrice, sPrice) => {
  let profitQty = 0;
  let lossQty = 0;
  if (bPrice > sPrice) {
    lossQty = bPrice - sPrice;
  } else {
    profitQty = sPrice - bPrice;
  }
  return { profitQty, lossQty };
};

//Create new Sales//
const createSales = async (product) => {
  try {
    let productId = product.productId;
    let qtySold = product.quantitySold;
    let soldPrice = product.sellingPrice;

    if (!product || product.length == 0) {
      return {
        status: 404,
        error: true,
        message: "No Product Added",
        data: null,
      };
    }

    if (qtySold <= 0) {
      return {
        status: 422,
        error: true,
        message: "Invalid Input for Quantity Sold",
        data: null,
      };
    }

    const isExists = await Products.findById(productId);
    if (isExists.isDeleted === false) {
      let buyingPrice = isExists.price;
      let productName = isExists.productName;

      //Calculating Profit or Loss//
      const { profitQty, lossQty } = calcProfLoss(buyingPrice, soldPrice);

      let getStock = await Stocks.findOne({ productId });
      if (getStock.isDeleted === false) {
        let generateSales = await Sales.create({
          productId: productId,
          quantitySold: qtySold,
          sellingPrice: soldPrice,
          buyingPrice: buyingPrice,
          profit: profitQty,
          loss: lossQty,
        });

        if (getStock.stockQuantity >= qtySold) {
          const reduceStock = await stockServices.stockDecrease(
            qtySold,
            productId
          );
          if (generateSales && !reduceStock.error) {
            let myProduct = {
              _id: generateSales._id,
              productName: productName,
              quantitySold: qtySold,
              productId: productId,
              sellingPrice: generateSales.sellingPrice,
              buyingPrice: buyingPrice,
              profit: profitQty,
              loss: lossQty,
            };
            return {
              status: 200,
              error: false,
              message: "Sales Added",
              data: myProduct,
            };
          } else {
            return {
              status: 400,
              error: true,
              message: "Failed to Add the Sales",
              data: null,
            };
          }
        } else {
          return {
            status: 410,
            error: true,
            message: "Insufficient Stock",
            data: null,
          };
        }
      } else {
        return {
          status: 410,
          error: true,
          message: "No Stock Available",
          data: null,
        };
      }
    } else {
      return {
        status: 404,
        error: true,
        message: "Product Not Found",
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

//Show all the Services//
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

const removeSales = async (product) => {
  try {
    const productId = product.id;
    const result = await Sales.findOneAndUpdate(
      {
        productId: productId,
      },
      {
        $set: {
          isDeleted: true,
          isActive: false,
          deletedDate: Date.now(),
        },
      },
      {
        new: true,
      }
    );

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
        message: "Failed to Delete Sales",
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
  createSales,
  validateData,
  showAllSales,
  showSingleSale,
  removeSales,
};

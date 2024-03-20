const Sales = require("../../../models/sales-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const stockServices = require("../stocks/stockService.js");

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
    if (sale.quantitySold === 0) {
      return {
        status: 400,
        error: true,
        message: "Bad request 'Quantity Sold Not Added'",
        data: null,
      };
    }
  }

  for (const sale of sales) {
    let response = await createSales(sale);
    // dataArray.push(response.data);
    if (response.data !== null) {
      dataArray.push(response.data);
    }
  }

  return {
    status: 200,
    error: false,
    message: "Successfully Added Sales",
    data: dataArray,
  };
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
      let profitQty = 0;
      let lossQty = 0;

      if (buyingPrice > soldPrice) {
        lossQty = buyingPrice - soldPrice;
        // console.log(lossQty, "Loss Quantity");
      } else {
        profitQty = soldPrice - buyingPrice;
        // console.log(profitQty, "Profit Quantity");
      }

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
              productId: productId,
              sellingPrice: generateSales.sellingPrice,
              buyingPrice: buyingPrice,
              profit: profitQty,
              loss: lossQty,
              message: "Sales Created and Stock Deducted",
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

module.exports = { createSales, validateData };

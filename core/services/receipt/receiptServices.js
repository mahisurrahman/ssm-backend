const Reciepts = require("../../../models/receipt-model");
const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model");
const Sales = require("../../../models/sales-model");
const { uuid } = require("uuidv4");

//Generate Receipt//
const generateReciept = async (salesCreated) => {
  try {
    if (salesCreated.lenght <= 0) {
      return {
        status: 400,
        error: true,
        message: "Invalid Sold Quantity",
        data: null,
      };
    }
    const recieptNumber = uuid();
    if (salesCreated.length <= 0) {
      return {
        status: 400,
        error: true,
        message: "Receipt wasn't added",
        data: null,
      };
    }

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
    const receiptId = data.id;
    const receiptDetails = await Reciepts.findById(receiptId, {
      isDeleted: false,
    });
    // if()
    let receiptProducts = [];
    for (let products of receiptDetails.soldProducts) {
      receiptProducts.push(products);
    }

    let prevQty = 0;
    for (let item of receiptProducts) {
      let stockDetails = await Stocks.findOne({ productId: item.productId });
      prevQty = stockDetails.stockQuantity;
      if (stockDetails) {
        Stocks.updateOne(
          { productId: item.productId },
          {
            stockQuantity: prevQty + item.quantitySold,
          }
        );
      } else {
        return {
          status: 304,
          error: true,
          message: "Stock Details Operation Failed",
          data: null,
        };
      }
    }
    let removeReceipt = await Reciepts.updateOne(
      { _id: receiptId },
      { isDeleted: true }
    );
    if (removeReceipt) {
      return {
        status: 200,
        error: false,
        message: "Success - Receipt Removed",
        data: null,
      };
    } else {
      return {
        status: 403,
        error: true,
        message: "Failed - Receipt Failed to Remove",
        data: null,
      };
    }
  } catch (error) {
    //c
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

module.exports = {
  generateReciept,
  showReciepts,
  removeReceipts,
  showSingleReceipts,
};

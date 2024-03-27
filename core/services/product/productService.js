const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model.js");

//Product Creation//
const productCreation = async (data) => {
  try {
    const { productName, description, price, stockQuantity } = data;
    if (!productName || !description || !price) {
      return {
        status: 204,
        error: true,
        message: "Input Missing",
        data: null,
      };
    }
    let intPrice = parseInt(price);
    let stockValue = stockQuantity ? parseInt(stockQuantity) : 0;

    //Creating Product on the Database//
    let result = await Products.create({
      productName: productName,
      description: description,
      price: intPrice,
      stockId: 0,
    });

    letProdID = result._id;

    //Creating Stock While Creating Product//
    let resultStock = null;
    if (result) {
      let stringProdId = result._id;
      resultStock = await Stocks.create({
        productId: stringProdId,
        stockQuantity: stockValue,
      });

      //Update Product Collection and Insert Stock ID//
      let updateProductCollection = await Products.findOneAndUpdate(
        { _id: letProdID },
        {
          stockId: resultStock._id,
        }
      );
      return {
        status: 200,
        error: false,
        message: "Product and Stock Added",
        data: null,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Stock wasn't added",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

//Show All Products//
const showAllProducts = async () => {
  try {
    const result = await Products.find({ isDeleted: false });
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

//Show Single Product//
const showSingleProd = async (data) => {
  try {
    const prodId = data.params.id;
    const result = await Products.findOne({ _id: prodId, isDeleted: false });
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
    return {
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    };
  }
};

//Remove a Single Product//
const removeSingleProd = async (data) => {
  try {
    const prodId = data.params.id;
    const result = await Products.findOneAndUpdate(
      { _id: prodId },
      {
        $set: {
          isDeleted: true,
          isActive: false,
          deletedDate: Date.now(),
        },
      },
      { new: true }
    );
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

//Update a Single Product//
const updateSingleProd = async (uptInfo, prodId) => {
  try {
    const filter = { _id: prodId };
    let myUpData = {};

    if (uptInfo.productName) {
      myUpData.productName = uptInfo.productName;
    }

    if (uptInfo.description) {
      myUpData.description = uptInfo.description;
    }
    const updatedData = { $set: myUpData };
    const result = await Products.updateOne(filter, updatedData);

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

//Update a Single Product's Price Only//
const updatePriceOfAProd = async (uptInfo, prodId) => {
  try {
    const id = prodId;
    const filter = { _id: id };
    const updatedInfo = uptInfo;
    const updatedData = {
      $set: {
        price: updatedInfo.price,
      },
    };
    const result = await Products.updateOne(filter, updatedData);
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

module.exports = {
  productCreation,
  showAllProducts,
  showSingleProd,
  removeSingleProd,
  updateSingleProd,
  updatePriceOfAProd,
};

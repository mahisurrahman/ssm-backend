const Products = require("../../../models/product-model");
const Stocks = require("../../../models/stock-model.js");
const stockService = require("../stocks/stockService.js");

//Product Creation//
const productCreation = async (data) => {
  try {
    const { productName, description, price, stockQuantity, productImg } = data;
    if (!productName || !description || !price || !productImg) {
      return {
        status: 204,
        error: true,
        message: "Input Missing",
        data: null,
      };
    }
    let intPrice = parseInt(price);
    let result = null;
    let isExistsProd = null;
    let updateProductCollection = null;
    let stockValue = stockQuantity ? parseInt(stockQuantity) : 0;

    isExistsProd = await Products.findOne({ productName: productName });

    if (isExistsProd !== null) {
      return {
        status: 409,
        error: true,
        message: "Product Exists Already",
        data: isExistsProd,
      };
    } else {
      //Creating Product on the Database//
      result = await Products.create({
        productName: productName,
        description: description,
        productImg: productImg,
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
        updateProductCollection = await Products.findOneAndUpdate(
          { _id: letProdID },
          {
            stockId: resultStock._id,
          }
        );
        if (
          result !== null &&
          resultStock !== null &&
          updateProductCollection !== null
        ) {
          return {
            status: 200,
            error: false,
            message: "Product and Stock Added",
            data: updateProductCollection,
          };
        }
      } else {
        return {
          status: 400,
          error: true,
          message: "Stock wasn't added",
          data: null,
        };
      }
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

//Show All Products (Including isDeleted:true)//
const showAllProductsOfDb = async () => {
  try {
    const result = await Products.find();
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
        message: "Failed or Product not Found",
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
    stockService.removeSingleStock({ id: prodId });
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
const updateSingleProd = async (body, params) => {
  try {
    let prodId = params.id;
    let findProdDetails = null;

    findProdDetails = await Products.findOne({ _id: prodId, isDeleted: false });
    if (findProdDetails) {
      if (body.productName) {
        const result = await Products.updateOne(
          { _id: prodId },
          { productName: body.productName },
          { new: true }
        );
        if (result) {
          return {
            status: 200,
            error: false,
            message: "Product Info Updated",
            data: result,
          };
        } else {
          return {
            status: 409,
            error: true,
            message: "Product Info Wasn't Updated",
            data: null,
          };
        }
      }
      if (body.description) {
        const result = await Products.updateOne(
          { _id: prodId },
          { description: body.description },
          { new: true }
        );
        if (result) {
          return {
            status: 200,
            error: false,
            message: "Product Info Updated",
            data: result,
          };
        } else {
          return {
            status: 409,
            error: true,
            message: "Product Info Wasn't Updated",
            data: null,
          };
        }
      }
    }
    return {
      status: 404,
      error: true,
      message: "Failed",
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
  showAllProductsOfDb,
  showSingleProd,
  removeSingleProd,
  updateSingleProd,
  updatePriceOfAProd,
};

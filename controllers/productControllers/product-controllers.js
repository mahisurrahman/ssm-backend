const Products = require("../../models/product-model");
const Stocks = require("../../models/stock-model");

//Create a Single Product//
const createProducts = async (req, res) => {
  try{
    const {
      productName,
      description,
      price,
      stockQuantity
    } = req.body;

    if(!productName || !description || !price){b
      return res.send({
        status: 204,
        error: true,
        message: "Input Missing",
        data: null,
      })
    }
    let intPrice = parseInt(price);
    let stockValue = stockQuantity ? parseInt(stockQuantity) : 0;

    //Creating Product on the Database//
    let result = await Products.create({
      productName: productName,
      description: description,
      price: intPrice,
    });

    //Creating Stock While Creating Product//
    let resultStock = null;
    if(result){
      resultStock = await Stocks.create({
        productId: result._id,
        stockQuantity: stockValue,
      });
    }
    return res.send({
      status: 200,
      error: false,
      message: "Product and Stock Added",
      data: null
    });
  }catch(err){
    console.error(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
}

//Show All Products//
const showProducts = async (req, res) => {
  try {
    const result = await Products.find({ isDeleted: false });
    return res.send({
      status: 200,
      error: false,
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Show a Single Product//
const showSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Products.findOne({ _id: id });
    if (result) {
      return res.send({
        status: 200,
        error: false,
        message: "Success",
        data: result,
      });
    } else {
      return res.send({
        status: 404,
        error: true,
        message: "Failed",
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Remove a Single Product//
const removeProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedAlready = await Products.findOne({ _id: id, isDeleted: true });
    if (deletedAlready) {
      return res.send({
        status: 404,
        error: true,
        message: "Product Already Deleted",
        data: null,
      });
    } else {
      const result = await Products.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isDeleted: true,
            isActive: false,
            deletedDate: Date.now(),
          },
        },
        { new: true }
      );
    }

    return res.send({
      status: 200,
      error: false,
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Update a Product Info//
const updateAProductInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id : id};
    const updatedInfo = req.body;
    let myUpData = {};

    if(updatedInfo.productName){
      myUpData.productName = updatedInfo.productName;
    }

    if(updatedInfo.description){
      myUpData.description = updatedInfo.description;
    }
    const updatedData = {$set: myUpData};
    const result = await Products.updateOne(filter, updatedData);

    return res.send({
      status: 200,
      err: false,
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};

//Update a Product Price//
const updateAProductPrice = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {_id: id};
    const updatedInfo = req.body;
    const updatedData = {
      $set: {
        price: updatedInfo.price,
      },
    };
    const result = await Products.updateOne(filter, updatedData);
    return res.send({
      status: 200,
      err: false,
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: err,
    });
  }
};



module.exports = {
  showProducts,
  createProducts,
  removeProduct,
  Products,
  showSingleProduct,
  updateAProductInfo,
  updateAProductPrice,
};

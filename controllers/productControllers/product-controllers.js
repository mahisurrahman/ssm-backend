const { ObjectId } = require("mongodb");
const Products = require("../../models/product-model");

//Create a Single Product//
const createProducts = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      status,
      isActive,
      isDeletd,
      createDate,
      deleteDate,
    } = req.body;

    let result = await Products.create({
      productName,
      description,
      price,
      status,
      isActive,
      isDeletd,
      createDate,
      deleteDate,
    });
    // return res.status(400).json(data);
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

//Update a Product Info//
const updateAProductInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInfo = req.body;

    if (updatedInfo?.productName !== "") {
      const updatedData = {
        $set: {
          productName: updatedInfo?.productName,
        },
      };
      const result = await Products.updateOne(id, updatedData);
    } 
    
    else if (updatedInfo?.description !== "") {
      const updatedData = {
        $set: {
          description: updatedInfo?.description,
        },
      };
      const result = await Products.updateOne(id, updatedData);
    } 
    
    else {
      const updatedData = {
        $set: {
          productName: updatedInfo.productName,
          description: updatedInfo.description,
        },
      };
      const result = await Products.updateOne(id, updatedData);
    }

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
    const updatedInfo = req.body;
    const updatedData = {
      $set: {
        price: updatedInfo.price,
      },
    };
    const result = await Products.updateOne(id, updatedData);
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

module.exports = {
  showProducts,
  createProducts,
  removeProduct,
  Products,
  showSingleProduct,
  updateAProductInfo,
  updateAProductPrice,
};

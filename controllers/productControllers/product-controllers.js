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
      status: 400,
      error: false,
      message: "Successfully Added",
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
    const result = await Products.find()
    console.log(result);
    return res.send({
      status: 200,
      error: false,
      message: "All Products Are Shown",
      data: result,
    })
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

//Delete a Single Product//


module.exports = { showProducts, createProducts, Products };

const saleServices = require("../../core/services/sales/saleServices.js");
const express = require("express");
const router = express.Router();

//Register New Sales//
const registerSales = async (req, res) => {
  try {
    const { sales } = req.body;

    let dataArray = [];
    for (const sale of sales) {
      let response = await saleServices.createSales(sale);
      dataArray.push(response.data);
      // return res.send(response);
      if (response.status === 422) {
        return res.send(response);
      }
    }
    return res.send({
      status: 200,
      error: false,
      message: "Successfully Added Sales",
      data: dataArray,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      error: true,
      message: "Internal Server Error",
      data: error,
    });
  }
};

module.exports = { registerSales };

// for (let i = 0; i < sales.length; i++) {
//   let response = await saleServices.createSales(sales[i]);
//   console.log(response);
//   if (response.data !== null) {
//     dataArray.push(response.data);
//   }
//   return res.send(response);
// }
// for (const sale of sales) {
//   if (sale.quantitySold <= 0) {
//     return res.send({
//       status: 422,
//       error: true,
//       message: "Invalid Input for Quantity Sold",
//       data: null,
//     });
//   }
// }
// const registerSales = async (req, res) => {
//   try {
//     const { sales } = req.body;

//     const exists = {};
//     for (const sale of sales) {
//       if (sale.quantitySold <= 0) {
//         return res.send({
//           status: 422,
//           error: true,
//           message: "Invalid Input for Quantity Sold",
//           data: null,
//         });
//       }

//       if (!exists[sale.productId]) {
//         exists[sale.productId] = {
//           productId: sale.productId,
//           sellingPrice: sale.sellingPrice,
//           quantitySold: sale.quantitySold,
//         };
//         console.log(exists);
//       } else {
//         exists[sale.productId].quantitySold += sale.quantitySold;
//         console.log(exists);
//       }
//     }

//     // Send response
//     return res.send({
//       status: 200,
//       error: false,
//       message: "Sales data consolidated successfully",
//       data: exists,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       status: 500,
//       error: true,
//       message: "Internal Server Error",
//       data: error,
//     });
//   }
// };

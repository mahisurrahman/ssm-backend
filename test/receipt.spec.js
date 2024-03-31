// const app = require("../index");
// const productServices = require("../core/services/product/productService");
// const stockServices = require("../core/services/stocks/stockService");
// const receiptServices = require("../core/services/receipt/receiptServices.js");
// const saleServices = require("../core/services/sales/saleServices");

// const chai = require("chai");
// const expect = chai.expect;
// const chaiHttp = require("chai-http");

// describe("Receipt Services Testing", () => {
//   //Generate Receipt//
//     describe("Generate Receipt", () => {
//       it("Should Create Receipt after finalizing multiple purchases or sales", async function () {
//         this.timeout(15000);

//         const data = [
//           {
//             productName: "Apple Watch",
//             productId: "65f7fb3d51d8978531f0a1e8",
//             quantitySold: 15,
//             sellingPrice: 1000,
//             buyingPrice: 100,
//             profit: 13500,
//             loss: 0,
//             salesId: "65ffbbb56454a6d7dff56890",
//           },
//         ];

//         const response = await receiptServices.generateReciept(data);
//         console.log(response);
//         expect(response.status).to.equal(200);
//         expect(response.error).to.be.false;
//       });
//     });

//     //Show All Receipt//
//     describe("Show Receipt", () => {
//       it("Should Show All the Receipt stored so far", async function () {
//         this.timeout(15000);

//         const response = await receiptServices.showReciepts();
//         console.log(response);
//         expect(response.status).to.equal(200);
//         expect(response.error).to.be.false;
//       });
//     });

//   //Show Single Reciepts with Its ID//
//     describe("Show a Single Receipt", () => {
//       it("Should Show A Single Receipt searched by its ID", async function () {
//         this.timeout(15000);

//         const data = {
//           id: "65ffa6103699322bb18e53e7",
//         };

//         const response = await receiptServices.showSingleReceipts(data);
//         console.log(response);
//         expect(response.status).to.equal(200);
//         expect(response.error).to.be.false;
//       });
//     });

//   //Remove A Single Reciepts with Its ID//
//   describe("Remove a Single Receipt", () => {
//     it("Should Remove A Single Receipt searched by its ID, Re-stable Stocks, and Remove Sales Informations", async function () {
//       this.timeout(15000);

//       const data = {
//         receiptKey: "9dd02ddf-49db-4cc1-a752-f6362e2636cf",
//       };

//       const response = await receiptServices.removeReceipts(data);
//       console.log(response);
//       expect(response.status).to.equal(200);
//       expect(response.error).to.be.false;
//     });
//   });
// });

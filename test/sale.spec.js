const app = require("../index");
const productServices = require("../core/services/product/productService");
const stockServices = require("../core/services/stocks/stockService");
const receiptServices = require("../core/services/receipt/receiptServices.js");
const saleServices = require("../core/services/sales/saleServices");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

describe("Sales Service Testing", () => {
  //Create Sales Data//
  describe("Create Sales", () => {
    it("Should validate the given data and then create a Sales data set with the give input of quantity sold, selling Price and product Id", async function () {
      this.timeout(150000);

      const data = [
        {
          quantitySold: 5,
          sellingPrice: 1150,
          productId: "65fe7e61e70d34519c458ea6",
        },
      ];

      const response = await saleServices.checkSalesData(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });

  //   //Show All Sales//
  describe("Show All Sales", () => {
    it("Should show all the sales that were generated", async function () {
      this.timeout(15000000);

      const response = await saleServices.showAllSales();
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });

  //   //Show A Single Sale Item//
  //   describe("Show Single Sale Item", () => {
  //     it("Should show A single sale data through the Sale's Id", async function () {
  //       this.timeout(15000);

  //       const req = {
  //         params: {
  //           id: "65fe7e61e70d34519c458ea6",
  //         },
  //       };

  //       const response = await saleServices.showSingleSale(req.params);
  //       console.log(response);
  //       expect(response.status).to.equal(200);
  //       expect(response.error).to.be.false;
  //     });
  //   });

  //   //Delete A Single Sale Item//
  //   describe("Delete A Single Sale Item", () => {
  //     it("Should Delete A single sale data through the Sale's Id", async function () {
  //       this.timeout(15000);

  //       const req = {
  //         body: "65fe7e61e70d34519c458ea6np",
  //       };

  //       const response = await saleServices.removeSales(req.body);
  //       console.log(response);
  //       expect(response.status).to.equal(200);
  //       expect(response.error).to.be.false;
  //     });
  //   });
});

const stockServices = require("../core/services/stocks/stockService");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Stock Service Testing", () => {
  //Create Stock//
  // describe("Creating Stock", () => {
  //   it("Should create a stock of a certain product passed by the prodeuct Id", async function () {
  //     this.timeout(15000);
  //     const data = {
  //       stockQuantity: 10000,
  //       prodId: "6609049b6f0c46c8d0278bff",
  //     };
  //     const response = await stockServices.stockCreation(data);
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  // //Invalid Product Id When Creating Stock//
  // describe("Invalid Product Id while creating Stocks", () => {
  //   it("Should return an error and terminate the stock creation process", async function () {
  //     this.timeout(15000);
  //     const data = {
  //       stockQuantity: 10,
  //       prodId: "6609049b6f0c46c8d0278bgg",
  //     };
  //     const response = await stockServices.stockCreation();
  //     console.log(response);
  //     expect(response.status).to.be.equal(404);
  //     expect(response.error).to.be.true;
  //     expect(response.message).to.be.equal("Product Not Found");
  //   });
  // });

  // //Trying to Create Stock, that's already exists//
  // describe("Trying to create stocks which already exists", () => {
  //   it("should return an error and terminate the process of stock creation", async function () {
  //     this.timeout(15000);
  //     const data = {
  //       stockQuantity: 10,
  //       prodId: "6609049b6f0c46c8d0278bff",
  //     };
  //     const response = await stockServices.stockCreation(data);
  //     console.log(response);
  //     expect(response.status).to.be.equal(400);
  //     expect(response.error).to.be.true;
  //     expect(response.message).to.be.equal(
  //       "Stock Already Exists !! Please update the Stock Quantity Manually"
  //     );
  //   });
  // });

  // // Update Stock//
  // describe("Update A Product's Stock", () => {
  //   it("Should update a stock of a certain product passed by the product's Id", async function () {
  //     this.timeout(15000);
  //     const data = {
  //       body: {
  //         stockQuantity: 100,
  //       },
  //       prodId: {
  //         id: "6609049b6f0c46c8d0278bff",
  //       },
  //     };
  //     const response = await stockServices.stockUpdate(data.body, data.prodId);
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  // //Stocks Increasing//
  // describe("Increase A Product's Stock", () => {
  //   it("Should Increase a stock of a certain product passed by the product's Id", async function () {
  //     this.timeout(15000);
  //     const data = {
  //       body: {
  //         stockQuantity: 100,
  //       },
  //       prodId: {
  //         id: "6609049b6f0c46c8d0278bff",
  //       },
  //     };
  //     const response = await stockServices.stockIncrease(
  //       data.body.stockQuantity,
  //       data.prodId
  //     );
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  //Stocks Decreasing//
  describe("Decresae A Product's Stock", () => {
    it("Should Decresae a stock of a certain product passed by the product's Id", async function () {
      this.timeout(15000);
      const data = {
        body: {
          stockQuantity: 10,
        },
        prodId: {
          id: "660a701a7d47b4ef48ab6f26",
        },
      };
      const response = await stockServices.stockDecrease(
        data.body.stockQuantity,
        data.prodId
      );
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });
  // //Show All Stock//
  // describe("Show All Stock", () => {
  //   it("Should Show an Array of All Stock", async function () {
  //     this.timeout(15000);
  //     const response = await stockServices.displayStock();
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  // //Show Single Stock Values//
  // describe("Show Single Stock from the  product ID", () => {
  //   it("Should Show an Array of a Stock of a Product", async function () {
  //     this.timeout(15000);
  //     const req = {
  //       params: {
  //         id: "6609049b6f0c46c8d0278bff",
  //       },
  //     };
  //     const response = await stockServices.displaySingleStock(req.params);
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  // //   //Delete Stock of A Product//
  // describe("Delete A Single Stock of a Product using the Product ID", () => {
  //   it("Should remove the stock of a Product", async function () {
  //     this.timeout(15000);
  //     const req = {
  //       params: {
  //         id: "65f272f94d32f2f921bf93a7",
  //       },
  //     };
  //     const response = await stockServices.removeSingleStock(req.params);
  //     console.log(response);
  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });
});

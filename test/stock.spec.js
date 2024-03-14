const stockServices = require("../core/services/stocks/stockService");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Stock Service Testing", () => {
  //Create Stock//
    describe("Creating Stock", () => {
      it("Should create a stock of a certain product passed by the prodeuct Id", async function () {
        this.timeout(15000);
        const data = {
          stockQuantity: 10000,
          prodId: "65f272f94d32f2f921bf93a7",
        };
        const response = await stockServices.stockCreation(data);
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.error).to.be.false;
      });
    });


  // Update Stock//
    describe("Update A Product's Stock", () => {
      it("Should update a stock of a certain product passed by the product's Id", async function () {
        this.timeout(15000);
        const data = {
          body:{
              stockQuantity: 10000,
          },
          prodId:{
              id: "65f272f94d32f2f921bf93a7",
        },
      };
        const response = await stockServices.stockUpdate(data.body, data.prodId);
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.error).to.be.false;
      });
    });



  //Stocks Increasing//
    describe("Increase A Product's Stock", () => {
      it("Should Increase a stock of a certain product passed by the product's Id", async function () {
        this.timeout(15000);
        const data = {
          body: {
            stockQuantity: 10000,
          },
          prodId: {
            id: "65f272f94d32f2f921bf93a7",
          },
        };
        const response = await stockServices.stockIncrease(data.body.stockQuantity, data.prodId);
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.error).to.be.false;
      });
    });


  //Stocks Decreasing//
    describe("Decresae A Product's Stock", () => {
      it("Should Decresae a stock of a certain product passed by the product's Id", async function () {
        this.timeout(15000);
        const data = {
          body: {
            stockQuantity: 10000,
          },
          prodId: {
            id: "65f272f94d32f2f921bf93a7",
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


  //Show All Stock//
    describe("Show All Stock", () => {
      it("Should Show an Array of All Stock", async function () {
        this.timeout(15000);
        const response = await stockServices.displayStock();
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.error).to.be.false;
      });
    });


  //Show Single Stock Values//
    describe("Show Single Stock from the  product ID", () => {
      it("Should Show an Array of a Stock of a Product", async function () {
        this.timeout(15000);
        const req = {
          params: {
              id: "65f272f94d32f2f921bf93a7"
          }
        }
        const response = await stockServices.displaySingleStock(req.params);
        console.log(response);
        expect(response.status).to.equal(200);
        expect(response.error).to.be.false;
      });
    });

  //Delete Stock of A Product//
  describe("Delete A Single Stock of a Product using the Product ID", () => {
    it("Should remove the stock of a Product", async function () {
      this.timeout(15000);

      const req = {
        params: {
          id: "65f272f94d32f2f921bf93a7",
        },
      };
      const response = await stockServices.removeSingleStock(req.params);
      console.log(response);

      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });
});

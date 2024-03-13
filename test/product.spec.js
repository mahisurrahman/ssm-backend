const productServices = require("../core/services/product/productService");
const stockServices = require("../core/services/stocks/stockService");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Product Service", () => {
  //Product Creations//
  // describe("Products Creation", () => {
  //   it("Should create a product and also create a stock for that product, and return the data as an array", async function () {
  //     this.timeout(15000);

  //     const data = {
  //       productName: "tSTP",
  //       description: "DES",
  //       price: 1000,
  //       stockQuantity: 50,
  //     };
  //     const response = await productServices.productCreation(data);
  //     console.log(response);

  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });

  //Show all Products//
  // describe("Show All Products", () => {
  //   it("Should return an array of all the Products", async function () {
  //     this.timeout(15000);

  //     const response = await productServices.showAllProducts();
  //     console.log(response);

  //     expect(response.status).to.equal(200);
  //     expect(response.error).to.be.false;
  //   });
  // });


  
});

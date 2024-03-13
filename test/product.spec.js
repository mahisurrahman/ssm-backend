const productServices = require('../core/services/product/productService');
const stockServices = require('../core/services/stocks/stockService');
const app = require('../index');

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("Product Service", () => {
  describe("Products Creation", () => {
    it("Should return an array of products", async function () {
      this.timeout(15000);

      const data = {
        productName: "tSTP",
        description: "DES",
        price: 1000,
        stockQuantity: 50,
        
      };
      const response = await productServices.productCreation(data)
      console.log(response)

      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });

  
});

const productServices = require("../core/services/product/productService");
const stockServices = require("../core/services/stocks/stockService");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Product Service", () => {

  //Product Creations//
  describe("Products Creation", () => {
    it("Should create a product and also create a stock for that product, and return the data as an array", async function () {
      this.timeout(15000);
      const data = {
        productName: "tSTP",
        description: "DES",
        price: 1000,
        stockQuantity: 50,
      };
      const response = await productServices.productCreation(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });



  //Show all Products//
  describe("Show All Products", () => {
    it("Should return an array of all the Products", async function () {
      this.timeout(15000);
      const response = await productServices.showAllProducts();
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });


  //Show Single Product//
  describe("Show Single Product", () => {
    it("Should return an array of a single product details", async function () {
      this.timeout(15000);
      const data = {
        params: {
          id: "65ed412619fcbd080910473a",
        },
      };
      const response = await productServices.showSingleProd(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });


  //Remove a Single Product//
  describe("Remove a Single Product", () => {
    it("Should Delete a Product", async function () {
      this.timeout(15000);
      const data = {
        params: {
          id: "65eec05739b37a7f422be600",
        }
      };
      const response =  await productServices.removeSingleProd(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });


  //Update a Single Product//
  describe("Update a Single Product", () => {
    it("Should Update a Product's Data", async function () {
      this.timeout(15000);
     
      const req = {
        params: {
          id: "65ed412619fcbd080910473a",
        },
        body: {
          "description": "under 99% discount",
        }
      };

      const response =  await productServices.updateSingleProd(req.body, req.params.id);
      console.log(response);

      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });


  //Update a Product's Price Only//
  describe("Update a Single Product's Price", () => {
    it("Should Update a Product's Price Only", async function () {
      this.timeout(15000);
     
      const req = {
        params: {
          id: "65ed412619fcbd080910473a",
        },
        body: {
          "price": 190,
        }
      };

      const response =  await productServices.updatePriceOfAProd(req.body, req.params.id);
      console.log(response);

      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
    });
  });
});

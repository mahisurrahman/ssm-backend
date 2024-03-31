const productServices = require("../core/services/product/productService");
const stockServices = require("../core/services/stocks/stockService");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const Stocks = require("../models/stock-model");

chai.use(chaiHttp);
let productId = null;

describe("Product Service", () => {
  //Product Creations//
  describe("Products Creation", () => {
    0;
    it("Should create a product, a stock and return as array", async function () {
      this.timeout(15000);
      const data = {
        productName: "Windows 11 Setup File",
        description: "Original Windows 11 ISO File with Key",
        price: 190,
        stockQuantity: 1000,
      };
      const response = await productServices.productCreation(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
      expect(response.message).to.be.success;
    });
  });

  //If given input gets missing//
  describe("If any given input gets missing", () => {
    it("Should return an error and stop the function to proceed", async function () {
      this.timeout(15000);
      const data = {
        productName: "Logitech G10 Pro Mouse",
        description: "",
        price: "10",
        stockQuantity: 100,
      };
      const response = await productServices.productCreation(data);
      console.log(response);
      expect(response.status).to.equal(204);
      expect(response.error).to.be.true;
      expect(response.message).to.be.InputMissing;
    });
  });

  //If Product Already Exists//
  describe("If same API hits multiple times", () => {
    it("Should return an error, and terminate the process", async function () {
      this.timeout(15000);
      const data = {
        productName: "Windows 11 Setup File",
        description: "Original Windows 11 ISO File with Key",
        price: 190,
        stockQuantity: 1000,
      };
      const response = await productServices.productCreation(data);
      console.log(response);
      expect(response.status).to.equal(409);
      expect(response.error).to.be.true;
      expect(response.message).to.be.ProductAlreadyExists;
    });
  });

  //Stock Creation Hits Multiple Times//
  describe("If stock creation API hits multiple times on same data", () => {
    it("should return an error and terminate the Process", async function () {
      this.timeout(15000);
      const data = {
        productName: "Windows 11 Setup File",
        description: "Original Windows 11 ISO File with Key",
        price: 190,
        stockQuantity: 1000,
      };
      const response = await productServices.productCreation(data);
      console.log(response);
      expect(response.status).to.equal(400);
      expect(response.error).to.be.true;
      expect(response.message).to.be.StockExists;
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
      expect(response.data).to.be.an("array");
      expect(response.message).to.be.Success;
    });
  });

  //Show Single Product//
  describe("Show Single Product", () => {
    it("Should return an array of a single product details", async function () {
      this.timeout(15000);
      const data = {
        params: {
          id: "6609049b6f0c46c8d0278bff",
        },
      };
      const response = await productServices.showSingleProd(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
      expect(response.message).to.be.Success;
    });
  });

  //Invalid Product Id//
  describe("Invalid Product Id on Show Single Product", () => {
    it("Should return an error and terminate the Process", async function () {
      this.timeout(15000);

      const data = {
        params: {
          id: "6609049b6f0c46c8d0278bgg",
        },
      };

      const response = await productServices.showSingleProd(data);
      console.log(response);

      expect(response.status).to.equal(404);
      expect(response.error).to.be.true;
      expect(response.message).to.be.Failed;
    });
  });

  //Update a Single Product//
  describe("Update a Single Product", () => {
    it("Should Update a Product's Data", async function () {
      this.timeout(15000);
      const response = await productServices.updateSingleProd(
        { productName: "Windows 10 Setup File" },
        { id: "6609049b6f0c46c8d0278bff" }
      );
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
      expect(response.message).to.be.Success;
    });
  });

  //Update a Product's Price Only//
  describe("Update a Single Product's Price", () => {
    it("Should Update a Product's Price Only", async function () {
      this.timeout(15000);
      const req = {
        params: {
          id: "6609049b6f0c46c8d0278bff",
        },
        body: {
          price: 100,
        },
      };
      const response = await productServices.updatePriceOfAProd(
        req.body,
        req.params.id
      );
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
      expect(response.message).to.be.Success;
    });
  });

  //Remove a Single Product//
  describe("Remove a Single Product", () => {
    it("Should Delete a Product", async function () {
      this.timeout(15000);
      const data = {
        params: {
          id: "6609049b6f0c46c8d0278bff",
        },
      };
      const response = await productServices.removeSingleProd(data);
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.error).to.be.false;
      expect(response.message).to.be.Success;
    });
  });
});

const mainRouter = require("../Routes/main/main-route.js");
const productRouter = require("../Routes/product/product-route.js");
const stockRouter = require("../Routes/stock/stock-route.js");
const salesRouter = require("../Routes/sale/sale-route");
const receiptRouter = require("../Routes/receipt/receipt-router.js");
const dailyReportRouter = require("../Routes/dailyReport/dailyReportRoute.js");

const routerManager = (app) => {
  //Home Routes//
  app.use("/", mainRouter);

  //Product Routes//
  app.use("/products", productRouter);

  //Stock Routes//
  app.use("/stocks", stockRouter);

  //Sales Routes//
  app.use("/sales", salesRouter);

  //Receipt Routes//
  app.use("/receipts", receiptRouter);

  //Daily Report Routes//
  app.use("/daily-report", dailyReportRouter);
};

module.exports = routerManager;

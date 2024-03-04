
const mainRouter = require ('../Routes/main/main-route.js');
const productRouter = require ('../Routes/product/product-route.js');

const routerManager = (app) => {
  app.use("/", mainRouter);
  app.use("/products", productRouter);
};


module.exports = routerManager;
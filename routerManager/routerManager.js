
const mainRouter = require ('../Routes/main/main-route.js');
const productRouter = require ('../Routes/product/product-route.js');

const routerManager = (app) => {

  //Home Routes//
  app.use("/", mainRouter);

  //Product Routes//
  app.use("/products", productRouter);
};


module.exports = routerManager;
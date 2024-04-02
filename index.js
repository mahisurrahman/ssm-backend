// require('dotenv').config();
const express = require("express");
const routerManager = require("./routerManager/routerManager");
const app = express();
const port = process.env.PORT || 8000;
const connectToDb = require("./Db/db");
const cors = require("cors");

app.use(cors("*"));
//MiddleWares//
app.use(express.json());

//Route Managements//
routerManager(app);

//DB Connection & Server Run //
connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

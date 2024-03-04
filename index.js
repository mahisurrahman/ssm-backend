const express = require('express');
const routerManager = require('./routerManager/routerManager');
const app = express();
const port = process.env.PORT || 8000;

//MiddleWares//
app.use(express.json());

//Route Managements//
routerManager(app);

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
})

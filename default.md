const decreaseStock = async (req, res) => {
  try{
      const id = req.params.id;
      const filter = { productId: id};
      const newStockAmount = req.body.stockQuantity;
      const updatedData = {
        $set: {
          stockQuantity: stockQuantity - newStockAmount
        },
      };
      const result = await Stocks.updateOne(filter, updatedData);
      return res.send({
        status: 200,
        err: false,
        message: "Success",
        data: result,
      })
  }catch(err){
    return res.send({
        stauts: 500,
        error: true, 
        message: "Internal Server Error",
        data: err,
    })
  }
};

In this code, I have a collection which holds products only and another collection which holds the stocks along with the product's id. Hence, I am fetching the product from the params.id and through that product, I want to reach its stock, how can I do that?
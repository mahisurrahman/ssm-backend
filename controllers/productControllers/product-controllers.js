const showProducts = async(req, res)=>{
    try{
        // const cursor = productCollection.find();
        // const result = await cursor.toArray();
        // res.send(result);
    }catch(err){
        res.status(400).send(err);
    }
};

const createProducts = async(req, res)=>{
    try{
        const data = req.body;
        console.log(data);
        // const result = await productCollection.insertOne(data);
        // res.send(result);
        res.status(400).send(data);
    }catch(err){
        res.status(200).send(err);
    }
}

module.exports = {showProducts, createProducts};
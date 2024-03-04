
const home = async(req, res)=>{
    try{
        res.status(200).send('Server Running Smoothly');
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports = {home};
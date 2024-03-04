require("dotenv").config();
const mongoose = require("mongoose");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b4ql9rm.mongodb.net/superShop?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection Successful");
  } catch (err) {
    console.error("database connection failed", err);
    process.exit(0);
  }
};

module.exports = connectToDb;

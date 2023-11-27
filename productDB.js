require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/products");

const productJson = require("./product.json");

const start =async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(productJson);
        console.log("success");
    }catch(error){
        console.log(error);
    }
};

start();
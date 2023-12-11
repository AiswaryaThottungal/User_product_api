require("dotenv").config();
const express = require("express")
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");


const connectDB = require("./db/connect")

//const PORT =  process.env.PORT || 5000;
const products_routes = require("./routes/products");
const MONGODB_URL = "mongodb+srv://traya_admin:PXrhfye5yM5XEtOa@traya.8gjndyi.mongodb.net/Traya?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
  
app.get("/", (req,res) => {
    console.log("Hello world")
    res.send("Backend Live")
});
 

//to set router

//app.use("/api/products",products_routes)


// const start = async() => {
//     try{
//         await connectDB(MONGODB_URL);
//         app.listen(PORT, () => {  
//            console.log( `${PORT} connected`);
//         })
//     } catch(error){
//         console.log(error);
//     }
// }

// start();

module.exports.handler = serverless(app); 
const Product = require("../models/products");

const getAllProducts = async(req,res) => {
    const {name,category,fabric,featured,sort,select} = req.query;
    const queryObject = {};

    if(name){    
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(category){    
        queryObject.category = {$regex: category, $options: "i"};
    }
    if(fabric){    
        queryObject.fabric = {$regex: fabric, $options: "i"};
    }
    if(featured){    
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortAttributes = sort.split(",").join(" ");
        apiData = apiData.sort(sortAttributes);
    }

    if(select){
        let selectAttributes = select.split(",").join(" ");
        apiData = apiData.select(selectAttributes);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    console.log("limit:"+limit)

    let skip =(page-1)*limit;

    apiData = apiData.skip(skip).limit()

    console.log(queryObject)

    const Products = await apiData;
    res.status(200).json({Products, nbHits:Products.length});
}

const getAllProductsTesting = async(req,res) => {
    const Products = await Product.find(req.query).select("name category")
    res.status(200).json({Products});
}

module.exports = {getAllProducts,getAllProductsTesting}
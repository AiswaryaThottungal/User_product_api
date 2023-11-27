import React, {useState, useEffect } from 'react';
import Axios from "axios";

const App = () => {
  const [products,setProducts] = useState("");

  const API = "https://54.89.232.72:5000/api/products";

  const getProducts = async (url) => {
    
    try {
      const res = await Axios.get(url);
      const products = await res.data;
      
      console.log(products)
      if(products.length > 0) {
        for(var product in products) {
          console.log(product.name);
        }
      } else {
        console.log("No products found");
      }
      
    } catch (error) {
     console.log(error);
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []); 

/*    useEffect(() =>{
    fetch("http://54.89.232.72:5000/api/products").then(res => {       
      return res.json()
    }).then(
      jsonRes => {setProducts(jsonRes.products);
    console.log(jsonRes)}
    )
  },[]);  */

  return (
    <div>
      <h2>API Testing</h2>
  {/*     <div>
        {products.map(product => {
          <li>{product.name}</li>
        })}
      </div> */}
    </div>
  )
}

export default App


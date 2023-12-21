import React, {useState, useEffect } from 'react';
import Axios from "axios";

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const productUrl = "http://localhost:5000/api/products/";
  const registerUrl = "http://localhost:5000/api/user/register";
  const loginUrl = "http://localhost:5000/api/user/login";

  const getProducts = async (url) => {
    
    try {
      const res = await Axios.get(url);
      const productdata = await res.data;
      const products=productdata.Products;
      console.log(products);
      if(products.length > 0) {
        for(var product of products) {
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
    getProducts(productUrl);
  }, []); 

  async function registerUser(event) {
    event.preventDefault();    
    Axios.post(registerUrl,{
      firstname : firstName,
      lastname: lastName,
      email: email,
      password: password
    })
    .then(res =>{
      console.log(res.data)
    })
  }

  async function loginUser(event) {
    event.preventDefault();
    console.log(email,password);
    Axios.post(loginUrl,{      
      email: email,
      password: password
    })
    .then(res =>{
      console.log(res.data)
    })
  }

  return (
    <>
    <div>
      <h2>API Testing</h2>
      <h3>Register</h3>
      <form name='register' onSubmit={registerUser}>
        <input 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
          type='text' 
          placeholder='First Name' 
        /> <br/>
        <input 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)}
          type='text' 
          placeholder='Last Name' 
        /><br/>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          type='email' 
          placeholder='Email' 
        /><br/> 
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          type='password' 
          placeholder='Password' 
        /> <br/>
        <button type='submit'> Register</button>
      </form>      
    </div>

     <div>      
      <h3>Login</h3>
      <form name='login' onSubmit={loginUser}>        
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          type='email' 
          placeholder='Email' 
        /><br/> 
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          type='password' 
          placeholder='Password' 
        />
        <button type='submit'> Login</button>
      </form>
      
  
    </div>
    </>
  )
}

export default App;


import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css';

const Login = () => {

    const navigate=useNavigate();
    const [formData,setFormData]=useState({email:'',password:''});
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('https://bidbuy.onrender.com/api/auth/login',formData);
            console.log(res.data);
            alert(res.data.message);
          const user = { token: res.data.token, role: res.data.role };
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.role);

        
        if(res.data.role==='seller'){
            navigate('/seller');
        }
        else if(res.data.role==='customer'){
            navigate('/customer');
        }
        else {
  navigate('/');}
    } catch(error){
        alert("login failed");
    };
}
    
  return (
    <div className='login-wrapper'>
    <div className='login'>
      <h2>Login</h2>
      <form className='login' onSubmit={handleSubmit} >
        <input  className='bt' type='text' name='email' placeholder='Email' onChange={handleChange}/>
        <input  className='bt' type='password' name='password' placeholder='Password' onChange={handleChange}/>
         <button  className='three' type='submit'>Login</button>
      </form>
    </div>
    </div>
  )

}

export default Login;

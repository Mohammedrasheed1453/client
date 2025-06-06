import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    companyname: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      companyname: formData.companyname.trim()
    };

    
    if (
      !trimmedData.name ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.role ||
      (trimmedData.role === 'seller' && !trimmedData.companyname)
    ) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await axios.post('https://bidbuy.onrender.com/api/auth/signup', trimmedData);
      alert(res.data.message);
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error signing up: ${error.response.data.message}`);
      } else {
        alert('Error signing up');
      }
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='signup-wrapper'>
    <div className='ten'>
      <h1>Sign up</h1>
      <form className="signup" onSubmit={handleSubmit}>
        <input className='one'
          name="name"
          placeholder="Name"
          type="text"
          onChange={handleChange}
          value={formData.name}
        />
        <input className='one'
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input className='one'
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
        <select  className='one' name="role" onChange={handleChange} value={formData.role}>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        {formData.role === 'seller' && (
          <input className='one'
            name="companyname"
            placeholder="Company Name"
            type="text"
            onChange={handleChange}
            value={formData.companyname}
          />
        )}
        <button className='two'
          type="submit"
          disabled={
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            (formData.role === 'seller' && !formData.companyname.trim())
          }
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import './SellerPage.css'

const SellerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    visiblePrice: '',
    hiddenPrice: '',
    category:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const token = localStorage.getItem('token');
      await axios.post(
        'https://bidbuy.onrender.com/api/products/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Product posted');
    } catch (err) {
      alert('Error posting product');
    }
  };

  return (
    <div className='complete'>
      <h2>Post a Product</h2>
      <form  className='sell' onSubmit={handleSubmit}>
        <input  className='one' name="name" placeholder="Product Name" onChange={handleChange} />
        <input  className='one' name="description" placeholder="Description" onChange={handleChange} />
        <input className='one' name="category" value={formData.category} onChange={handleChange} placeholder="Category (optional)"/>
        <input className='six' name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <input  className='one' name="visiblePrice" placeholder="Visible Price" onChange={handleChange} type="number" />
        <input className='one' name="hiddenPrice" placeholder="Hidden Price" onChange={handleChange} type="number" />
        <button  className='two' type="submit">Post Product</button>
      </form>
    </div>
  );
};

export default SellerPage;

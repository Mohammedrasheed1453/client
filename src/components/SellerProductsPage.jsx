import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SellerProductsPage.css';

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://bidbuy.onrender.com/api/products/seller', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProducts(res.data))
      .catch(err => alert('Error fetching products'));
  }, []);

  const startEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      visiblePrice: product.visiblePrice,
      hiddenPrice: product.hiddenPrice
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://bidbuy.onrender.com/api/products/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditing(null);
      const res = await axios.get('https://bidbuy.onrender.com/api/products/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://bidbuy.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== id));
      alert('Product deleted successfully');
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="seller-products-page">
      <h2 className="seller-title">Your Products</h2>
      <div className="seller-product-grid">
        {products.map(product =>
          editing === product._id ? (
            <div key={product._id} className="seller-product-card editing">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
              <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
              <input name="visiblePrice" type="number" value={form.visiblePrice} onChange={handleChange} placeholder="Visible Price" />
              <input name="hiddenPrice" type="number" value={form.hiddenPrice} onChange={handleChange} placeholder="Hidden Price" />
              <div className="seller-actions">
                <button className="seller-btn save" onClick={() => saveEdit(product._id)}>Save</button>
                <button className="seller-btn cancel" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={product._id} className="seller-product-card">
              <img src={product.imageUrl} alt={product.name} className="seller-product-img" />
              <div className="seller-product-info">
                <h3 className="seller-product-name">{product.name}</h3>
                <p className="seller-product-desc">{product.description}</p>
                <p className="seller-product-price"><strong>Visible Price:</strong> ₹{product.visiblePrice}</p>
                <p className="seller-product-price hidden"><strong>Hidden Price:</strong> ₹{product.hiddenPrice}</p>
              </div>
              <div className="seller-actions">
                <button className="seller-btn edit" onClick={() => startEdit(product)}>Edit</button>
                <button
                  className="seller-btn delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SellerProductsPage;

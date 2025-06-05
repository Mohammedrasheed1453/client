import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homebg from './homebg.png';
import './Start.css';
import axios from 'axios';

const categoryList = [
  { name: "tshirts", query: "tshirts" },
  { name: "shoes", query: "shoes" },
  { name: "pants", query: "pants" },
  { name: "Electronics", query: "Electronics" }
];

const Start = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

useEffect(() => {
  Promise.all(
    categoryList.map(cat =>
      axios
        .get('https://bidbuy.onrender.com/api/products/category', {
          params: { category: cat.query, limit: 4 }
        })
        .then(res => ({
          name: cat.name,
          products: res.data
        }))
    )
  ).then(data => setCategories(data));
}, []);


  return (
    <div className="start-page">
      {/* Top banner section */}
      <div
        className="top-banner"
        style={{
          background: `url(${homebg}) no-repeat center center`,
          backgroundSize: 'cover',
          minHeight: '400px',
          width: '100%',
        }}
      >
        <div className="banner-content">
          <h1>Fashion Changing Always</h1>
          <button onClick={() => navigate('/home')}>Shop Now</button>
        </div>
      </div>

      {/* Categories section */}
      <div className="categories-section">
        {categories.map((cat) => (
          <div key={cat.name} className="category-block">
            <h2>{cat.name}</h2>
            <div className="product-grid">
              {cat.products.length === 0 && (
                <div style={{ color: "#888", padding: "1rem" }}>
                  No products found.
                </div>
              )}
              {cat.products.map((product) => (
                <div
                  key={product._id}
                  className="product-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">₹{product.visiblePrice}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Start;

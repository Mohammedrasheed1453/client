import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css'; 

const SellerDashboard = () => {
  const navigate = useNavigate();
 useEffect(() => {
      
      document.body.className = 'body-default';
      return () => {
        document.body.className = '';
      };
    }, []);
  return (
  <div className="seller-welcome">
  <h2>Welcome Seller!</h2>
  <p>What would you like to do?</p>
  <div className="button-group">
    <button onClick={() => navigate('/seller/post')}>
      Post New Product
    </button>
    <button onClick={() => navigate('/seller/products')}>
      Edit Existing Products
    </button>
  </div>
</div>

  );
};

export default SellerDashboard;


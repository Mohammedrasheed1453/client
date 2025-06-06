import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bid, setBid] = useState('');
  const [feedback, setFeedback] = useState('');
  const [agreedPrice, setAgreedPrice] = useState(null);

  useEffect(() => {
    axios.get(`https://bidbuy.onrender.com/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    document.body.className = 'shop__body';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleBid = async () => {
    try {
      const res = await axios.post('https://bidbuy.onrender.com/api/products/bargain', {
        productId: id,
        bid: Number(bid)
      });
      setFeedback(res.data.message);

      if (res.data.message.toLowerCase().includes('accepted')) {
        setAgreedPrice(Number(bid));
        console.log("Setting agreed price to:", Number(bid));
      }
    } catch (err) {
      setFeedback('Error submitting bid');
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add to cart!');
      return;
    }
    try {
      await axios.post(
        'https://bidbuy.onrender.com/api/cart/add',
        {
          productId: product._id,
          quantity: 1,
          bargainedPrice: agreedPrice
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Product added to cart at your bargained price!');
    } catch (err) {
      alert('Failed to add to cart');
      console.error(err);
    }
  };

  if (!product) return <div className="shop__loading">Loading...</div>;

  return (
    <div className="shop__container">
      <div className="shop__product-layout">
        <div className="shop__product-detail">
          <h2 className="shop__product-title">{product.name}</h2>
          <div className="shop__image-wrapper">
            <img src={product.imageUrl} alt={product.name} className="shop__product-image" />
          </div>
          <p className="shop__product-desc">{product.description}</p>
          <p className="shop__product-price">Price: ₹{product.visiblePrice}</p>
          <input
            type="number"
            value={bid}
            onChange={e => setBid(e.target.value)}
            placeholder="Enter your bid"
            className="shop__bid-input"
          />
          <button onClick={handleBid} className="shop__button shop__button--bid">
            Submit Bid
          </button>
          {feedback && <p className="shop__feedback">{feedback}</p>}
          {agreedPrice && (
            <button
              onClick={handleAddToCart}
              className="shop__button shop__button--cart"
            >
              Add to Cart at ₹{agreedPrice}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

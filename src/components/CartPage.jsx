
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://bidbuy.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.items);
    };
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      'https://bidbuy.onrender.com/api/cart/remove',
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(cartItems.filter(item => item.product._id !== productId));
  };

  // Calculate total and savings
  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.bargainedPrice !== undefined && item.bargainedPrice !== null
        ? item.bargainedPrice
        : item.product.visiblePrice) *
        item.quantity,
    0
  );

  const totalSavings = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.product.visiblePrice -
        (item.bargainedPrice !== undefined && item.bargainedPrice !== null
          ? item.bargainedPrice
          : item.product.visiblePrice)) *
        item.quantity),
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-page__header">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-page__empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-page__items">
            {cartItems.map(item => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="cart-item__image"
                />
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.product.name}</h3>
                  <div className="cart-item__details">
                    <span className="cart-item__qty">Qty: {item.quantity}</span>
                    <span className="cart-item__original">
                      Original: ₹{item.product.visiblePrice}
                    </span>
                    <span className="cart-item__price">
                      Price: ₹{item.bargainedPrice ?? item.product.visiblePrice}
                    </span>
                    {item.bargainedPrice != null &&
                      item.bargainedPrice !== item.product.visiblePrice && (
                        <span className="cart-item__savings">
                          (Saved ₹{item.product.visiblePrice - item.bargainedPrice})
                        </span>
                      )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.product._id)}
                  className="cart-item__remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-page__summary">
            <div className="cart-page__total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            {totalSavings > 0 && (
              <div className="cart-page__savings">
                <span>You Saved:</span>
                <span>₹{totalSavings}</span>
              </div>
            )}
            <button
              onClick={() => navigate('/checkout')}
              className="cart-page__checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

import React, { useState } from 'react';
import axios from 'axios';
import './CheckoutPage.css'

const CheckoutPage = ({ onOrderPlaced }) => {
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('COD');
  const [message, setMessage] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders/place',
        { address, paymentMode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      onOrderPlaced && onOrderPlaced();
    } catch (err) {
      setMessage('Order failed. Try again.');
    }
  };

  if (message) return <div><h2>{message}</h2><h3>Happy shopping!</h3></div>;

  return (
   <form className="checkout-form" onSubmit={handleCheckout}>
  <h2>Checkout</h2>

  <div>
    <label>Address:</label>
    <textarea
      value={address}
      onChange={e => setAddress(e.target.value)}
      required
    />
  </div>

  <div>
    <label>Payment Mode:</label>
    <select
      value={paymentMode}
      onChange={e => setPaymentMode(e.target.value)}
    >
      <option value="COD">Cash on Delivery</option>
      <option value="UPI">UPI</option>
      <option value="Card">Card</option>
    </select>
  </div>

  <button type="submit">Place Order</button>
</form>

  );
};

export default CheckoutPage;

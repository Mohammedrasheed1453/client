import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://bidbuy.onrender.com/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1 className="orders-page__header">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="orders-page__empty">No orders yet.</p>
      ) : (
        <div className="orders-page__list">
          {orders.map(order => (
            <div className="orders-card" key={order._id}>
              <div className="orders-card__info">
                <div className="orders-card__date">
                  <span className="orders-card__label">Date:</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="orders-card__address">
                  <span className="orders-card__label">Address:</span>
                  <span>{order.address}</span>
                </div>
                <div className="orders-card__payment">
                  <span className="orders-card__label">Payment:</span>
                  <span>{order.paymentMode}</span>
                </div>
              </div>
              <div className="orders-card__items">
                <h3 className="orders-card__items-title">Order Items</h3>
                <ul className="orders-card__items-list">
                  {order.items.map(item => (
                    <li key={item.product._id} className="orders-card__item">
                      <span className="orders-card__item-name">{item.product.name}</span>
                      <span className="orders-card__item-qty">(Qty: {item.quantity})</span>
                      <span className="orders-card__item-price">
                        ₹{item.bargainedPrice || item.product.visiblePrice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const timer = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [searchTerm, navigate]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="logo.png" alt="logo" className="logo" />
      </div>

      <div className="nav-center">
        <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
          />
        </form>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#007f00',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            Logout
          </button>
        )}
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/about">About BidBuy</Link>
      </div>
    </nav>
  );
};

export default Navbar;

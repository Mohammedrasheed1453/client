import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-wrapper' >
    <div className="home">
      <h1>BidBuy</h1>
      <button className='bt1' onClick={() => navigate('/login')}>Login</button>
      <button className='bt1' onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
    </div>
  );
};

export default Home;

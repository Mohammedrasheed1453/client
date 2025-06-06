import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaInstagram, FaFacebook, FaBookOpen, FaBullseye, FaCogs, FaGift, FaUsers } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="hero">
        <h1>About BidBuy</h1>
        <p>Your Marketplace for the Best Deals!</p>
      </div>

    
      <div className="image-grid">
        <img src="offer2.png" alt="Our Team" />
        <img src="offer3.png" alt="Our Products" />
        <img src="offer4.png" alt="Best Deals" />
      </div>

      
      <section className="about-section">
        <h2><FaBookOpen /> Our Story</h2>
        <p>
          Welcome to BidBuy, the innovative e-commerce platform where buyers and sellers meet to strike the best deals through bargaining and negotiation.
          We believe in fair prices and a fun shopping experience for everyone.
        </p>
      </section>

      
      <section className="about-section">
        <h2><FaBullseye /> Our Mission</h2>
        <p>
          Our mission is to empower buyers and sellers by providing a transparent, interactive marketplace.
          Whether you’re looking for the perfect product or aiming to sell your items, BidBuy is your go-to platform for a seamless and enjoyable shopping journey.
        </p>
      </section>

    
      <section className="about-section">
        <h2><FaCogs /> How It Works</h2>
        <div className="steps">
          <div className="step-card">
            <h3>1</h3>
            <p>Browse Products</p>
          </div>
          <div className="step-card">
            <h3>2</h3>
            <p>Bargain with Sellers</p>
          </div>
          <div className="step-card">
            <h3>3</h3>
            <p>Add to Cart & Checkout</p>
          </div>
        </div>
      </section>

      
      <section className="about-section">
        <h2><FaGift /> Current Offers</h2>
        <ul>
          <li><strong>Welcome Offer:</strong> 10% off your first purchase!</li>
          <li><strong>Referral Bonus:</strong> Get ₹100 credit for every friend you refer.</li>
          <li><strong>Festive Sale:</strong> Extra discounts on select items during holidays.</li>
          <li><strong>Free Shipping:</strong> On all orders above ₹500.</li>
        </ul>
      </section>

    
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"BidBuy helped me save so much money! Love the bargaining feature."</p>
          <p>- Priya, Mumbai</p>
        </div>
        <div className="testimonial-card">
          <p>"Great platform for both buyers and sellers. Highly recommended!"</p>
          <p>- Rohan, Delhi</p>
        </div>
      </section>

  
      <section className="about-section">
        <h2><FaUsers /> Meet the Team</h2>
        <p>
          Our team is dedicated to making your shopping experience smooth and enjoyable.
          We’re always here to help—reach out to us anytime!
        </p>
      </section>

      
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button">Sign Up</Link>
        <Link to="/login" className="auth-button">Login</Link>
      </div>

    
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <a href="mailto:support@bidbuy.com" className="contact-link">
            <FaEnvelope /> support@bidbuy.com
          </a>
          <a href="https://instagram.com/bidbuy" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FaInstagram /> @bidbuy
          </a>
          <a href="https://facebook.com/bidbuy" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FaFacebook /> @bidbuy
          </a>
        </div>
      </section>

      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default AboutPage;

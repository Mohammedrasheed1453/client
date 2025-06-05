
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResultsPage.css';
import Pagination from './Pagination'; // Import your Pagination component

const PRODUCTS_PER_PAGE = 8;

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [bargainProduct, setBargainProduct] = useState(null);
  const [bid, setBid] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('q') || '';
    axios.get('https://bidbuy.onrender.com/api/products/search', {
      params: { search: searchTerm }
    })
      .then(res => {
        setProducts(res.data);
        setCurrentPage(1); // Reset to first page on new search
      })
      .catch(err => console.error('Error fetching products:', err));
  }, [location.search]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const openBargain = (product) => {
    setBargainProduct(product);
    setBid('');
    setFeedback('');
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add to cart!');
      navigate('/login');
      return;
    }
    try {
      await axios.post(
        'https://bidbuy.onrender.com/api/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Product added to cart!');
    } catch (err) {
      alert('Failed to add to cart');
      console.error(err);
    }
  };

  const handleBid = async () => {
    try {
      const res = await axios.post('https://bidbuy.onrender.com/api/products/bargain', {
        productId: bargainProduct._id,
        bid: Number(bid)
      });
      setFeedback(res.data.message);
    } catch (err) {
      setFeedback('Error submitting bid');
    }
  };

  return (
    <div className='search__container'>
      <h2 className='search__title'>Search Results</h2>
      <div className='search__product-grid'>
        {currentProducts.map(product => (
          <div key={product._id} className="search__product-card">
            <div className="search__product-image-wrapper">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="search__product-image"
              />
            </div>
            <div className="search__product-info">
              <h3 className="search__product-name">{product.name}</h3>
              <p className="search__product-desc">{product.description}</p>
              <p className="search__product-price">Price: ₹{product.visiblePrice}</p>
            </div>
            <div className="search__product-actions">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="search__product-action search__product-action--bargain"
              >
                Bargain
              </button>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="search__product-action search__product-action--cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No products found.</p>}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchResultsPage;

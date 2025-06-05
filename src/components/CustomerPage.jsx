// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CustomerPage.css';
// import { useNavigate } from 'react-router-dom';

// const CustomerPage = () => {
//   const [products, setProducts] = useState([]);
//   const [bargainProduct, setBargainProduct] = useState(null);
//   const [bid, setBid] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/all')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('Error fetching products:', err));
//   }, []);

//   const openBargain = (product) => {
//     setBargainProduct(product);
//     setBid('');
//     setFeedback('');
//   };

//   const handleAddToCart = async (productId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please login to add to cart!');
//       navigate('/login');
//       return;
//     }
//     try {
//       await axios.post(
//         'http://localhost:5000/api/cart/add',
//         { productId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('Product added to cart!');
//     } catch (err) {
//       alert('Failed to add to cart');
//       console.error(err);
//     }
//   };

//   const handleBid = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/products/bargain', {
//         productId: bargainProduct._id,
//         bid: Number(bid)
//       });
//       setFeedback(res.data.message);
//     } catch (err) {
//       setFeedback('Error submitting bid');
//     }
//   };

//   return (
//     <div className="customer__container">
//       <h2 className="customer__title">Available Products</h2>
//       <div className="customer__product-grid">
//         {products.map(product => (
//           <div key={product._id} className="customer__product-card">
//             <div className="customer__product-image-wrapper">
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="customer__product-image"
//               />
//             </div>
//             <div className="customer__product-info">
//               <h3 className="customer__product-name">{product.name}</h3>
//               <p className="customer__product-desc">{product.description}</p>
//               <p className="customer__product-price">Price: ₹{product.visiblePrice}</p>
//             </div>
//             <div className="customer__product-actions">
//               <button
//                 onClick={() => navigate(`/product/${product._id}`)}
//                 className="customer__product-action customer__product-action--bargain"
//               >
//                 Bargain
//               </button>
//               <button
//                 onClick={() => handleAddToCart(product._id)}
//                 className="customer__product-action customer__product-action--cart"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerPage.css';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;

const CustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [bargainProduct, setBargainProduct] = useState(null);
  const [bid, setBid] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

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
        'http://localhost:5000/api/cart/add',
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
      const res = await axios.post('http://localhost:5000/api/products/bargain', {
        productId: bargainProduct._id,
        bid: Number(bid)
      });
      setFeedback(res.data.message);
    } catch (err) {
      setFeedback('Error submitting bid');
    }
  };

  return (
    <div className="customer__container">
      <h2 className="customer__title">Available Products</h2>
      <div className="customer__product-grid">
        {currentProducts.map(product => (
          <div key={product._id} className="customer__product-card">
            <div className="customer__product-image-wrapper">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="customer__product-image"
              />
            </div>
            <div className="customer__product-info">
              <h3 className="customer__product-name">{product.name}</h3>
              <p className="customer__product-desc">{product.description}</p>
              <p className="customer__product-price">Price: ₹{product.visiblePrice}</p>
            </div>
            <div className="customer__product-actions">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="customer__product-action customer__product-action--bargain"
              >
                Bargain
              </button>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="customer__product-action customer__product-action--cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CustomerPage;

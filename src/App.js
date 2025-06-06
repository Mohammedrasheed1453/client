import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import SellerPage from './components/SellerPage';     
import CustomerPage from './components/CustomerPage'; 
import Navbar from './components/Navbar';
import ProductDetailsPage from './components/ProductDetailsPage'
import SellerProductsPage  from './components/SellerProductsPage';
import SellerDashboard from './components/SellerDashboard';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import CheckoutPage from './components/CheckoutPage';
import SearchResultsPage from './components/SearchResultsPage';
import AboutPage from './components/AboutPage';
import Start from './components/Start';
function App() {
const role = localStorage.getItem('role');
const ProtectedRoute = ({ children, allowedRole }) => {
  if (!role) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" />;
  return children;
};


  return (
    <Router>
         <Navbar />
         <div style={{ paddingTop: '80px' }}>
      <Routes>
       
        <Route path="/" element={<Start />} />
        <Route path='/home' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/search' element={<SearchResultsPage />}/>
        <Route path='/about' element={<AboutPage />}/>
        

        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/seller/post"
  element={
    <ProtectedRoute allowedRole="seller">
      <SellerPage />
    </ProtectedRoute>
  }
/>
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRole="customer">
              <CustomerPage />
            </ProtectedRoute>
          }
        />
        <Route path='/product/:id' element={<ProductDetailsPage/>} />
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute allowedRole="seller">
              <SellerProductsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;


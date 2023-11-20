import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import { Snackbar, Typography, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const applyPromoCode = () => {
    // Mocked logic for validating and applying the promo code
    if (promoCode === 'HEYMAX20') {
      const discount = 0.2; // 20% discount
      const newTotalPrice = cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
      const newDiscountedPrice = newTotalPrice - newTotalPrice * discount;

      setCart((prevCart) =>
        prevCart.map((item) => ({ ...item, originalPrice: item.quantity * item.product.price }))
      );

      setIsPromoApplied(true);
      setSnackbarMessage('Promo code applied successfully!');
    } else {
      setIsPromoApplied(false);
      setSnackbarMessage('Invalid promo code. Please try again.');
    }

    setSnackbarOpen(true);
    setPromoCode('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const processPayment = () => {
    console.log('Processing payment...');
    alert('Payment processed successfully');
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    // Your existing code for updating total price goes here
  }, [cart]);

  return (
    <div className="cart-container">
      <Header
        cart={cart}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
        applyPromoCode={applyPromoCode}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        processPayment={processPayment}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <div className="content-container">
        <HomePage addToCart={addToCart} />
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={isPromoApplied ? 'success' : 'error'}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Cart;

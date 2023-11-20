import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Snackbar,
  Grid,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const Header = ({
  cart,
  openDrawer,
  closeDrawer,
  isDrawerOpen,
  applyPromoCode,
  processPayment,
  updateQuantity,
  removeFromCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  const calculateDiscountedPrice = () => {
    // Apply promo code "HEYMAX20" for a 20% discount
    const promoCodeDiscount = promoCode === 'HEYMAX20' ? 0.2 : 0;
    return calculateTotalPrice() * (1 - promoCodeDiscount);
  };

  const handleApplyPromoCode = () => {
    if (promoCode === 'HEYMAX20') {
      setDiscountedPrice(calculateDiscountedPrice());
      setSnackbarMessage('Promo code applied successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setDiscountedPrice(null);
      setSnackbarMessage('Invalid promo code. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping App
          </Typography>
          <IconButton color="inherit" onClick={openDrawer}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <List>
          <ListItem>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Cart Summary
            </Typography>
            <IconButton onClick={closeDrawer} color="inherit">
              <Typography>Close</Typography>
            </IconButton>
          </ListItem>
          <List>
            {cart.map((item) => (
              <ListItem key={item.product.id} className="cart-item">
                <div className="product-info">
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Price: $${item.product.price.toFixed(2)}`}
                  />
                </div>
                <div className="product-quantity">
                  <div className="quantity-buttons">
                    <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                    <Button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="quantity-button">
                      +
                    </Button>
                    </Grid>
                    <Grid item>
                    <Typography align="center">
                    {item.quantity}
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="quantity-button">
                      -
                    </Button>
                    </Grid>
                    </Grid>
                  </div>
                  <IconButton onClick={() => removeFromCart(item.product.id)} className="remove-button">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
          <ListItem>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </Typography>
          </ListItem>
          {promoCode && discountedPrice !== null && (
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green' }}>
                Discounted Price: ${discountedPrice.toFixed(2)}
              </Typography>
            </ListItem>
          )}
          <ListItem>
            <TextField
              label="Enter Promo Code"
              variant="outlined"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="contained" onClick={handleApplyPromoCode} sx={{ marginLeft: 2 }}>
              Apply Promo Code
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" onClick={processPayment}>
              Pay
            </Button>
          </ListItem>
        </List>
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Header;

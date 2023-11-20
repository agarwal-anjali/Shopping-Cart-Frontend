import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  CardActions,
  Snackbar,
} from '@mui/material';
import { getProducts } from '../../api';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';

const HomePage = ({ addToCart }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarMessage(`Added ${product.name} to the cart`);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Explore our products:
      </Typography>
      <List>
        {getProducts().map((product) => (
          <Card key={product.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <ListItemText primary={product.name} secondary={`$${product.price.toFixed(2)}`} />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product)}
                startIcon={<AddIcon />}
                sx={{ backgroundColor: '#793a99', color: 'white' }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default HomePage;

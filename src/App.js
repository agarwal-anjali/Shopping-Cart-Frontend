import React from 'react';
import Cart from './components/Cart/Cart';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <div className="App">
        <Cart />
      </div>
    </ThemeProvider>
  );
}

export default App;

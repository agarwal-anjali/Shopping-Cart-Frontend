import React from 'react';
import Cart from './components/Cart/Cart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: '#793a99',
      },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Cart />
    </div>
    </ThemeProvider>
  );
}

export default App;
import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#793a99',
    },
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#793a99',
    },
    mode: 'dark',
  },
});

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    themeMode === 'light' ? setThemeMode('dark') : setThemeMode('light');
  };

  const selectedTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={selectedTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

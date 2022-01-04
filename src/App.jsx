import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import theme from './lib/theme';
import Routes from './Routes';

const App = function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

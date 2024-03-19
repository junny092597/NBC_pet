import React from 'react';
import Router from './shared/Router';
import GlobalStyles from './styles/Global-styles';
import theme from './styles/Theme';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <Router />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

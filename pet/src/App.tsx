import React from 'react';
import Router from './shared/Router';

import './App.css';
import { db } from './firebase/firebase';

import GlobalStyles from './styles/Global-styles';


function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;

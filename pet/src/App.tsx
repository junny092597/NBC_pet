import React from 'react';
import Router from './shared/Router';
import './App.css';
import { db } from './firebase/firebase';

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomPage';
import Shopping from '../pages/Shopping';
import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

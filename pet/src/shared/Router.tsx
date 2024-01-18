import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomPage';
import Shopping from '../pages/Shopping';
import KakaoMapPage from '../pages/KakaoMapPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/map" element={<KakaoMapPage/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;

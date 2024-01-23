import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomPage';
import Shopping from '../pages/Shopping';

import KakaoMapPage from '../pages/KakaoMapPage';

import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Layout from '../components/home/Layout';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout children={undefined} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/map" element={<KakaoMapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default Router;

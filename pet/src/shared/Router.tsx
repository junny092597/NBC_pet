import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomPage';
import Shopping from '../pages/Shopping';


import ShoppingDetail from '../pages/ShoppingDetail';
import KakaoMapPage from '../pages/KakaoMapPage';
import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Layout from '../components/home/Layout';
import Community from '../pages/Community';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout children={undefined} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping" element={<Shopping />}>
          <Route path="/shopping/:category" element={<Shopping />} />
        </Route>
        <Route path="/ShoppingDetail/:name" element={<ShoppingDetail />} />
        <Route path="/map" element={<KakaoMapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/community" element={<Community />} />
        <Route path="/daily" element={<DailyBoard />} />
        <Route path="/questions" element={<QuestionBoard />} />
      </Route>
    </Routes>
  );
};

export default Router;

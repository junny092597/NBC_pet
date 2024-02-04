import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomPage';
import Shopping from '../pages/Shopping';
import ShoppingDetail from '../pages/ShoppingDetail';
import KakaoMapPage from '../pages/KakaoMapPage';
import { CheckoutPage } from '../components/tosspay/Checkout';
import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Layout from '../components/home/Layout';
import Community from '../pages/Community';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';
import Youtubeshorts from '../components/community/Youtubeshorts';
import WritePost from '../components/community/WritePost';
import WriteQuestionPost from '../components/community/WriteQuestionPost';
import PostDetail from '../components/community/PostDetail';
import QuestionDetail from '../components/community/QuestionDetail';
import Sidebar from '../components/community/Sidebar';
import Popular from '../components/community/Popular';
import EditPost from '../components/community/EditPost';
import ChatContainer from '../components/Chat/ChatContainer'; 
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
        <Route path="/" element={<Sidebar />}>
          <Route path="/community" element={<Community />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/daily" element={<DailyBoard />} />
          <Route path="/questions" element={<QuestionBoard />} />
          <Route path="/shorts" element={<Youtubeshorts />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/write-question" element={<WriteQuestionPost />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/chat" element={<ChatContainer />} />
        </Route>
      </Route>
      <Route path="/CheckoutPage" element={<CheckoutPage />} />
    </Routes>
  );
};

export default Router;

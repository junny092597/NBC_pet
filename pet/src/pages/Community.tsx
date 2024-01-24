// pages/Community.tsx
// pages/Community.tsx
import React from 'react';
import Layout from '../components/community/Layout';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';

const Community = () => {
  return (
    <Layout>
      <DailyBoard />
      <QuestionBoard />
    </Layout>
  );
};

export default Community;

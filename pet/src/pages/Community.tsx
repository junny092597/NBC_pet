import React from 'react';
import Layout from '../components/community/Layout';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';
import Youtubeshorts from '../components/community/Youtubeshorts';

const Community = () => {
  return (
    <Layout>
      <DailyBoard />
      <QuestionBoard />
      <Youtubeshorts />
    </Layout>
  );
};

export default Community;

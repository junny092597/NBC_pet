import React, { useState } from 'react';
import Popular from '../components/community/Popular';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';
import Youtubeshorts from '../components/community/Youtubeshorts';

type Tab = 'daily' | 'question' | 'shorts' | 'popular';

const Community = () => {
  const [activeTab] = useState<Tab>('daily');

  const renderComponent = () => {
    switch (activeTab) {
      case 'popular':
        return <Popular />;
      case 'daily':
        return <DailyBoard />;
      case 'question':
        return <QuestionBoard />;
      case 'shorts':
        return <Youtubeshorts />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default Community;

import React, { useState } from 'react';
import DailyBoard from '../components/community/DailyBoard';
import Youtubeshorts from '../components/community/Youtubeshorts';

type Tab = 'daily' | 'shorts';

const Community = () => {
  const [activeTab] = useState<Tab>('daily');

  const renderComponent = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyBoard />;
      case 'shorts':
        return <Youtubeshorts />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default Community;

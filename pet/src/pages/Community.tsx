import React, { useState } from 'react';
import styled from 'styled-components';
import DailyBoard from '../components/community/DailyBoard';
import QuestionBoard from '../components/community/QuestionBoard';
import Youtubeshorts from '../components/community/Youtubeshorts';

// 버튼들을 세로로 정렬하기 위한 컨테이너 스타일
const PageContainer = styled.div`
  display: flex; // 수평 레이아웃 설정
`;

// 왼쪽 사이드바를 위한 컨테이너
const SidebarContainer = styled.div`
  width: 200px; // 사이드바 너비 설정
  border-right: 1px solid #ccc; // 오른쪽에 테두리 설정
  display: flex;
  flex-direction: column; // 세로 정렬
  padding: 10px;
`;

// 각 탭 버튼 스타일
const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px;
  border: none;
  background-color: ${(props) => (props.isActive ? '#eee' : 'transparent')};
  cursor: pointer;
  text-align: left;
  width: 100%; // 버튼 너비를 사이드바에 맞춤
  border-bottom: 1px solid #ddd; // 하단 경계선 추가

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

// 탭 컨텐츠 영역
const ContentContainer = styled.div`
  flex-grow: 1; // 나머지 공간을 채움
  padding: 10px;
`;

// 탭 타입
type Tab = 'daily' | 'question' | 'shorts' | 'etc';

const Community = () => {
  const [activeTab, setActiveTab] = useState<Tab>('daily');

  const renderComponent = () => {
    switch (activeTab) {
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

  return (
    <PageContainer>
      <SidebarContainer>
        <TabButton isActive={activeTab === 'daily'} onClick={() => setActiveTab('daily')}>
          일상
        </TabButton>
        <TabButton isActive={activeTab === 'question'} onClick={() => setActiveTab('question')}>
          질문
        </TabButton>
        <TabButton isActive={activeTab === 'shorts'} onClick={() => setActiveTab('shorts')}>
          SHORTS
        </TabButton>
      </SidebarContainer>
      <ContentContainer>
        {renderComponent()}
      </ContentContainer>
    </PageContainer>
  );
};

export default Community;

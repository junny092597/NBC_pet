// components/community/Layout.tsx
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Sidebar 컴포넌트를 임포트합니다.

const LayoutContainer = styled.div`
  display: flex;
  // 여기에 필요한 스타일 추가...
`;

const Content = styled.main`
  flex-grow: 1;
  // 여기에 필요한 스타일 추가...
`;

interface LayoutProps {
  children: React.ReactNode; // children prop 타입 정의
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar /> {/* Sidebar 컴포넌트 렌더링 */}
      <Content>{children}</Content> {/* 자식 컴포넌트 렌더링 */}
    </LayoutContainer>
  );
};

export default Layout;

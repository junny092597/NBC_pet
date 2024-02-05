import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  background-color: #e2faeb;
  width: 200px;
  border-right: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px;
  border: none;
  background-color: ${props => (props.isActive ? '#f5f5dc' : 'transparent')};
  cursor: pointer;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: #d9f8e5;
  }

  &:last-child {
    border-bottom: none;
  }
  font-family: GmarketSansMedium;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 10px;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <PageContainer>
      <SidebarContainer>
        <TabButton isActive={currentPath.includes('/daily')} onClick={() => navigate('/daily')}>
          일상
        </TabButton>
        <TabButton isActive={currentPath === '/shorts'} onClick={() => navigate('/shorts')}>
          shorts
        </TabButton>
      </SidebarContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </PageContainer>
  );
};

export default Sidebar;

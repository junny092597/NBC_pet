// components/community/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 10%;
  background-color: #f0f0f0;
`;

const NavLinkStyled = styled(NavLink)`
  color: black;
  padding: 20px;
  text-decoration: none;
  font-size: 1.2rem;
  text-align: left;
  display: block;
  margin-bottom: 10px;

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
`;



const Sidebar = () => {
  return (
    <Navigation>
      <NavLinkStyled to="/popular" className={({ isActive }) => (isActive ? 'active' : '')}>
        인기
      </NavLinkStyled>
      <NavLinkStyled to="/DailyBoard" className={({ isActive }) => (isActive ? 'active' : '')}>
        일상
      </NavLinkStyled>
      <NavLinkStyled to="/QuestionBoard" className={({ isActive }) => (isActive ? 'active' : '')}>
        질문
      </NavLinkStyled>
      <NavLinkStyled to="/shorts" className={({ isActive }) => (isActive ? 'active' : '')}>
        SHORTS
      </NavLinkStyled>
    </Navigation>
  );
};

export default Sidebar;
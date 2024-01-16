/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import logo from '../../assets/images/testlogo.png';
import loginIcon from '../../assets/images/loginIcon.png'
import styled from 'styled-components';

import Shopping from '../../pages/Shopping';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Image src={logo} alt={'logo image'} />
        '금쪽이'를 부탁해
      </Logo>
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Shopping">쇼핑</a>
          </li>
        </ul>
      </Navigation>
      <LoginMark>
        <img src={loginIcon} alt="Login" height="20" />
        <a href="/login"></a>
      </LoginMark>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 15px;
  margin: 0;
  align-items: center;
  display: flex;
`;

const LoginMark = styled.div`
    
`

const Image = styled.img`
  width: 5%;
  height: 5%;
  margin-right: 10px;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
  }

  li {
    margin-right: 1em;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Header;

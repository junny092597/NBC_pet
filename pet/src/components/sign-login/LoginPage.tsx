import React from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/images/logo2.png'; // 로고 이미지 경로
import Login from './Login'; // 로그인 컴포넌트 경로

const LoginPage = () => {
  return (
    <Container>
    <AllContainer>
      <LeftContentContainer>
        <LogoContainer>
          <LogoImage src={logoImage} alt="로고 이미지" />
        </LogoContainer>
      </LeftContentContainer>
      <RightContentContainer>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </RightContentContainer>
    </AllContainer>
    </Container>
  );
};

const Container = styled.div`
  @media (max-width: 768px) {
    margin-left: 4rem;
  } `

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 50rem;
    height: 80rem;
    display: flex;
  }
`;

const LeftContentContainer = styled.div`
  width: 35%;
  height: 60%;
`;

const RightContentContainer = styled.div`
  width: 25%;
  height: 60%;
  background-color: #fafaf7;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {

}

`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {

  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
`;

export default LoginPage;

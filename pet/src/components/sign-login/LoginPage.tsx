import styled from 'styled-components';
import logoImage from '../../assets/images/logo2.png'; // 로고 이미지 경로
import Login from './Login'; // 로그인 컴포넌트 경로



const LoginPage = () => {

  return (
    <Container >
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
  max-height: 100vh;
  overflow: hidden;
  `

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LeftContentContainer = styled.div`
  width: 35%;
  height: 60%;
`

const RightContentContainer = styled.div`
  width: 25%;
  height: 60%;
  background-color: #fafaf7;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default LoginPage;

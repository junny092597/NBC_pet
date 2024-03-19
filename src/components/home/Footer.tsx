import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footers>
      <Div>
        <FooterLogo>
          <img src={logo} alt={'footer logo'} />
        </FooterLogo>
        <Links>
          <a href="/">쿠키 정책</a>
          <a href="/">고객 서비스 가이드</a>
          <P>© {currentYear} </P>
        </Links>

      </Div>
    </Footers>
  );
};

const Footers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #f6f7c4;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterLogo = styled.div`
left: 30px;
  img {
    width: 100px; // 로고 이미지의 너비 조정
    height: auto; // 높이를 자동으로 조절하여 비율 유지
  }
  @media (max-width: 768px) {
    margin-left: 0; // 가운데 정렬
    margin-bottom: 1em; // 아래 여백 추가
  }
`;
const Div = styled.div`
  display: flex;
  margin: 0 auto;
  width: 96%;
  max-width: 1100px;
  height: 100%;
`;

const P = styled.p`
margin-top: 20px;
margin-left: 140px;
font-family: GmarketSansMedium;

@media (max-width: 768px) {
    margin-left: 0; // 모바일에서 가운데 정렬
    text-align: center;
  }
`;
const Links = styled.p`
  margin-top: 20px;
  margin-left: 730px;
  text-decoration: none;
  color: #333;
  font-family: GmarketSansMedium;

  a:hover {
    margin-right: 10px;
    text-decoration: underline;
  }
`;

export default Footer;

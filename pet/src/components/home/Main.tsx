import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Category from './MainCategory';
import banner1 from '../../assets/images/banner1.png'
import banner2 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CategoryItem {
  title: string;
  imageSrc: string;
}

const categories: CategoryItem[] = [
  { title: '커뮤니티', imageSrc: '/1.jpg' },
  { title: '쇼핑', imageSrc: '/2.jpg' },
  { title: '맵', imageSrc: '/3.jpg' },
  { title: '가족찾기', imageSrc: '/4.jpg' },
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const Main: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <MainContainer>
      <Slider {...settings}>
        <BannerSlide>
          <BannerImage src={banner1} alt="Banner 1" />
          <BannerText>
            <BannerTitle>우리 아이 아플땐 어디로?</BannerTitle>
            <BannerDescription>가까운 병원 찾기</BannerDescription>
          </BannerText>
        </BannerSlide>
        <BannerSlide>
          <BannerImage src={banner2} alt="Banner 2" />
          <BannerText>
            <BannerTitle>귀여운거 + 귀여운거 = 왕귀여운거</BannerTitle>
            <BannerDescription>다른 친구들의 일상을 만나보세요!</BannerDescription>
          </BannerText>
        </BannerSlide>
        <BannerSlide>
          <BannerImage src={banner3} alt="Banner 3" />
          <BannerText>
            <BannerTitle>우리 아이, 뭘 먹여야 할까?</BannerTitle>
            <BannerDescription>아이들의 '최애픽'만 담았습니다</BannerDescription>
          </BannerText>
        </BannerSlide>
        <BannerSlide>
          <BannerImage src={banner2} alt="Banner 4" />
          <BannerText>
            <BannerTitle>큰 제목 4</BannerTitle>
            <BannerDescription>내용 4</BannerDescription>
          </BannerText>
        </BannerSlide>
      </Slider>
      
      <Title>카테고리</Title>
      <CategoriesContainer>
        {categories.map((category, index) => (
          <Category key={index} title={category.title} imageSrc={category.imageSrc} onClick={() => {
            throw new Error('Function not implemented.');
          }} />
        ))}
      </CategoriesContainer>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  padding: 2rem;
  text-align: center;
  font-family: GmarketSansMedium;
`;


const Title = styled.p`
  font-size: 30px;
  margin: 20px auto;
  color: #312B2B;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
`;

const BannerSlide = styled.div`
  position: relative; // 상대적 위치 설정
  width: 100%;
  height: 500px; // 높이 조정이 필요하다면 변경하세요
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 컨테이너를 채우도록 조정
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  right: 400px; // 우측 간격 조정
  transform: translateY(-50%); // 세로 중앙 정렬
  text-align: right; // 텍스트를 오른쪽 정렬
  color: black; // 글자색은 이미지에 맞게 조정
`;

const BannerTitle = styled.h1`
  font-size: 24px; // 제목 크기 조정
  font-weight: bold; // 글자 두께 조정
  margin-bottom: 15px; // 제목과 설명 사이의 간격
`;

const BannerDescription = styled.p`
  font-size: 16px; // 설명 글자 크기 조정
`;

export default Main;
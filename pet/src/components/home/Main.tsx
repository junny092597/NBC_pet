import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import MainCategory from './MainCategory'; // 경로 확인 필요
import banner1 from '../../assets/images/banner1.png'; // 실제 경로에 따라 다름
import banner2 from '../../assets/images/banner2.png'; // 실제 경로에 따라 다름
import banner3 from '../../assets/images/banner3.png'; // 실제 경로에 따라 다름
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CategoryItem {
  title: string;
  imageSrc: string;
  description: string;  // 추가된 속성
  buttonText: string; 
  url: string;
}

const categories: CategoryItem[] = [
  { title: '커뮤니티', imageSrc: '/CommunityCard.png', description: '커뮤니티 설명', buttonText: '더 보기', url: '/community' },
  { title: '쇼핑', imageSrc: '/ShoppingCard.png', description: '쇼핑 설명', buttonText: '쇼핑 시작', url: '/shopping' },
  { title: '맵', imageSrc: '/HospitalCard.png', description: '맵 설명', buttonText: '지도 보기', url: '/map' },
  { title: '가족찾기', imageSrc: '/4.jpg', description: '가족찾기 설명', buttonText: '찾아보기', url: '/' },
];
const Main: React.FC = () => {
  const handleCategoryClick = (url: string) => {
    window.location.href = url;
  };
  const EmptyArrow = () => null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  nextArrow: <EmptyArrow />,
  prevArrow: <EmptyArrow />,
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

      
      <CategoriesContainer>
        {categories.map((category, index) => (
          <MainCategory
            key={index}
            title={category.title}
            imageSrc={category.imageSrc}
            description={category.description} // 추가된 부분
            buttonText={category.buttonText}   // 추가된 부분
            onClick={() => handleCategoryClick(category.url)}
          />
        ))}
      </CategoriesContainer>
    </MainContainer>
  );
};

const MainContainer = styled.main`
padding: 0; 
  margin: 0; 
  width: 100%; 
  text-align: center;
  font-family: GmarketSansMedium;
  background-color: #FAFAF4;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  justify-content: space-around;
  align-items: flex-start;

  margin: 0 auto;
`;

const BannerSlide = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  right: 400px;
  transform: translateY(-50%);
  text-align: right;
  color: black;
`;

const BannerTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BannerDescription = styled.p`
  font-size: 16px;
`;

export default Main;
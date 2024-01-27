import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import MainCategory from './MainCategory'; // 경로 확인 필요
import banner1 from '../../assets/images/banner1.png'; // 실제 경로에 따라 다름
import banner2 from '../../assets/images/banner2.png'; // 실제 경로에 따라 다름
import banner3 from '../../assets/images/banner3.png'; // 실제 경로에 따라 다름
import perpet from '../../assets/images/perpet.png';
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
  {
    title: '커뮤니티',
    imageSrc: '/CommunityCard.png',
    description: '유튜브 Shorts, \n다른 사람들과의 소통으로 \n나만의 꿑팁을 전수하고, \n다른 반려인들과 \n즐거운 시간을 보내세요!',
    buttonText: '커뮤니티',
    url: '/community'
  },
  { title: '쇼핑', 
  imageSrc: '/ShoppingCard.png', 
  description: '아이들이 가장 좋아하는, \n그리고 영양만점의 사료와 \n간식들을 담았습니다! \n맛과 영양을 모두 잡은 \n제품들을 만나보세요!', 
  buttonText: '쇼핑 하기', 
  url: '/shopping' 
},
  { title: '맵', 
  imageSrc: '/HospitalCard.png', 
  description: '당장 아이에게 \n필요한 것은 많고, \n이 동네는 잘 모르겠고, \n뭘 해야할지 모르겠다면?\n지도로 내 위치를 파악하고, \n근처에 있는 \n여러 가게와 \n병원들을 탐색하세요!', 
  buttonText: '지도 보기', 
  url: '/map' 
},
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

      <ContentSection>
        <ImageContainer>
          <img src={perpet} alt="설명" />
        </ImageContainer>
        <TextContainer>
          <Title>For Pet</Title>
          <Description>Pet들을 위한 Perfect한 정보</Description>
          // ... 추가적인 텍스트나 요소들 ...
        </TextContainer>
      </ContentSection>
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

  margin: 80px auto 0;
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

const ImageContainer = styled.div`
  flex: 0 0 auto; // 이미지 크기를 유지
  margin-right: -20px; // 이미지와 텍스트 사이 간격

  img {
    width: 300px; // 이미지 너비 조절
    height: auto; // 높이 자동 조절
    margin-left: 150px;
  }
`;
const ContentSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 250px; // 필요에 따라 조절
`;



const TextContainer = styled.div`
  flex: 1; // 나머지 공간을 차지
`;

const Title = styled.h1`
  // 제목 스타일
`;

const Description = styled.p`
  // 내용 스타일
`;
export default Main;
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
  description: string; // 추가된 속성
  buttonText: string;
  url: string;
}

const categories: CategoryItem[] = [
  {
    title: '커뮤니티',
    imageSrc: '/CommunityCard.png',
    description:
      '유튜브 Shorts, \n다른 사람들과의 소통으로 \n나만의 꿑팁을 전수하고, \n다른 반려인들과 \n즐거운 시간을 보내세요!',
    buttonText: '커뮤니티',
    url: '/community',
  },
  {
    title: '쇼핑',
    imageSrc: '/ShoppingCard.png',
    description:
      '아이들이 가장 좋아하는, \n그리고 영양만점의 사료와 \n간식들을 담았습니다! \n맛과 영양을 모두 잡은 \n제품들을 만나보세요!',
    buttonText: '쇼핑 하기',
    url: '/shopping',
  },
  {
    title: '맵',
    imageSrc: '/HospitalCard.png',
    description:
      '당장 아이에게 \n필요한 것은 많고, \n이 동네는 잘 모르겠고, \n뭘 해야할지 모르겠다면?\n지도로 내 위치를 파악하고, \n근처에 있는 \n여러 가게와 \n병원들을 탐색하세요!',
    buttonText: '지도 보기',
    url: '/map',
  },
  {
    title: '채팅',
    imageSrc: '/4.jpg',
    description:
      '내가 모르던 꿀팁을 \n바로 실시간으로?\n 퍼펫트의 모든 사람들과 \n내 상황을 공유하고,\n 실시간으로 솔류션을 \n받아보세요!',
    buttonText: '이야기하기',
    url: '/',
  },
];
const Main: React.FC = () => {
  const handleCategoryClick = (url: string, title: string) => {
    if (title === '채팅') {
      alert('추후 업데이트 예정입니다');
    } else {
      window.location.href = url;
    }
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
            <BannerDescription>가까운 병원 찾기:'맵'을 이용해보세요</BannerDescription>
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
            <BannerTitle>지금 같이 '댕댕이' 이야기 할사람?</BannerTitle>
            <BannerDescription>지금 다른 반려인들과 실시간으로 채팅을 하고, 정보를 나누세요!</BannerDescription>
          </BannerText>
        </BannerSlide>
      </Slider>

      <CategoriesContainer>
        {categories.map((category, index) => (
          <MainCategory
            key={index}
            title={category.title}
            imageSrc={category.imageSrc}
            description={category.description}
            buttonText={category.buttonText}
            onClick={() => handleCategoryClick(category.url, category.title)}
          />
        ))}
      </CategoriesContainer>

      <ContentSection>
        <ImageContainer>
          <img src={perpet} alt="설명" />
        </ImageContainer>
        <TextContainer>
          <Title>For Pet: Pet들을 위한 Perfect한 정보</Title>
          <Description></Description>
          For Pet에서는 반려동물과 그들의 가족에게 꼭 필요한 정보와 지식을 공유합니다.
          <br />
          <br />
          우리는 반려동물의 건강, 행복, 그리고 장수를 위한 실용적인 조언과 전문적인 인사이트를 나눕니다.
          <br />
          <br />
          여러분의 소중한 친구들이 더욱 건강하고 행복한 삶을 누릴 수 있도록, 더욱 함께하는 서비스를 제공합니다.
          <br />
          <br />
          함께 성장하고, 배우고, 사랑을 나누세요. 여러분과 여러분의 반려동물이 행복한 순간을 만들어 가는 데에 For Pet가
          도움이 되기를 바랍니다.
          <br />
          <br />
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
  background-color: #fafaf4;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  justify-content: space-around;
  align-items: flex-start;
  margin: 90px auto 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BannerSlide = styled.div`
  position: relative;
  width: 100%;
  height: 510px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto; }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    display: none; /* 작은 화면에서는 이미지 숨김 */
  }
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  right: 350px;
  transform: translateY(-50%);
  text-align: right;
  color: black;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    width: 100%;
  }
`;

const BannerTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const BannerDescription = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 auto; // 이미지 크기를 유지
  margin-right: 30px; // 이미지와 텍스트 사이 간격
  margin-bottom: 70px;    
  img {
    width: 70%; // 이미지 너비 조절
    height: auto; // 높이 자동 조절
    margin-left: 110px;

    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const ContentSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 180px; 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  flex: 1; // 나머지 공간을 차지
  position: absolute;
  left: 42.5rem;
  text-align: left;

  @media (max-width: 768px) {
    position: static;
    margin-top: 1rem;
    text-align: center;
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5em; 
  font-weight: bold;
  margin-bottom: 1em;
`;
const Description = styled.p`
  font-size: 1.2em; 
`;
export default Main;

import React from 'react';
import styled from 'styled-components';
import Category from './MainCategory';
import maintest from '../../assets/images/testmain.png'


const categories = [
  { title: '커뮤니티', imageSrc: '/1.jpg' },
  { title: '쇼핑', imageSrc: '/2.jpg' },
  { title: '맵', imageSrc: '/3.jpg' },
  { title: '가족찾기', imageSrc: '/4.jpg' },
];

const Main: React.FC = () => {
  return (
    <MainContainer>
        <Image src={maintest} alt={'main image'} />
        <>
        <Title>카테고리</Title>
        </>
      <CategoriesContainer>
        {categories.map((category, index) => (
          <Category key={index} title={category.title} imageSrc={category.imageSrc} onClick={function (): void {
            throw new Error('Function not implemented.');
          } } />
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

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 100px;
`;

const Title = styled.p`
  font-size: 30px;
  margin: 20px auto;
  color: 312B2B;
`;

const CategoriesContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
`;

export default Main;
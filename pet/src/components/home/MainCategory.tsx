import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  title: string;
  imageSrc: string;
  onClick: () => void;
}

const MainCategory: React.FC<CategoryProps> = ({ title, imageSrc }) => {
  const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // 기본 동작 방지
    // 클릭한 카테고리에 따라 페이지 이동
    switch (title) {
      case '커뮤니티':
        window.location.href = '/';
        break;
      case '쇼핑':
        window.location.href = '/shopping';
        break;
      case '맵':
        window.location.href = '/map';
        break;
      case '가족찾기':
        window.location.href = '/';
        break;
      default:
        break;
    }
  };

  return (
    <CategoryContainer onClick={handleCategoryClick}>
      <CategoryImage src={imageSrc} alt={title} />
      <TitleBox>{title}</TitleBox>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  flex: 1;
  margin: 20px;
  margin-bottom: 10px;
  text-align: center;
  width: 300px;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const TitleBox = styled.div`
  background-color: #f8dede;
  padding: 15px;
  border-radius: 8px;
  color: #625656;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export default MainCategory;

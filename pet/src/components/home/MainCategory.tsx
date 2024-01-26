// MainCategory.tsx
import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  title: string;
  imageSrc: string;
  onClick: () => void;
}

const MainCategory: React.FC<CategoryProps> = ({ title, imageSrc, onClick }) => {
  return (
    <MainCategoryContainer onClick={onClick}>
      <CategoryImage src={imageSrc} alt={title} />
      <CategoryText>{title}</CategoryText>
    </MainCategoryContainer>
  );
};

const MainCategoryContainer = styled.div`
  flex: 1;
  margin: 20px 80px;
  text-align: center;
  width: 500px; /* 너비 변경 */
  height: 500px;
  position: relative; /* 포지셔닝을 위한 설정 */
  cursor: pointer;
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 설정 */
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: filter 0.3s ease; /* 부드러운 효과를 위한 전환 설정 */

  &:hover {
    filter: blur(8px); /* 호버 시 블러 효과 적용 */
  }
`;

const CategoryText = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 50%; /* 중앙 정렬을 위한 설정 */
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 설정 */
  color: #625656;
  font-size: 24px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.7); /* 반투명 배경 */
  visibility: hidden; /* 기본적으로 텍스트 숨김 */

  ${MainCategoryContainer}:hover & {
    visibility: visible; /* 호버 시 텍스트 보이기 */
  }
`;



export default MainCategory;

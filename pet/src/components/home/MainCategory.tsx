import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  title: string;
  imageSrc: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const MainCategory: React.FC<CategoryProps> = ({ title, imageSrc, description, buttonText, onClick }) => {
  return (
    <MainCategoryContainer onClick={onClick}>
      <CategoryImage src={imageSrc} alt={title} />
      <CategoryText>{description}</CategoryText>
      <ButtonContainer>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonContainer>
    </MainCategoryContainer>
  );
};

const Categories = () => {
  const handleClick = () => {
    // 카테고리 클릭 이벤트 처리
  };

  return (
    <div>
      <MainCategory
        title="카테고리 1"
        imageSrc="image1.jpg"
        description="이것은 카테고리 1의 설명입니다."
        buttonText="버튼 1"
        onClick={handleClick}
      />
      <MainCategory
        title="카테고리 2"
        imageSrc="image2.jpg"
        description="이것은 카테고리 2의 설명입니다."
        buttonText="버튼 2"
        onClick={handleClick}
      />
      <MainCategory
        title="카테고리 3"
        imageSrc="image3.jpg"
        description="이것은 카테고리 3의 설명입니다."
        buttonText="버튼 3"
        onClick={handleClick}
      />
      <MainCategory
        title="카테고리 4"
        imageSrc="image4.jpg"
        description="이것은 카테고리 4의 설명입니다."
        buttonText="버튼 4"
        onClick={handleClick}
      />
    </div>
  );
};

const MainCategoryContainer = styled.div`
  flex: 1;
  margin: 10px 70px;
  text-align: center;
  width: 500px;
  height: auto; /* 높이를 자동으로 조절 */
  position: relative;
  cursor: pointer;
  overflow: visible; /* 버튼이 잘리지 않도록 설정 */
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 500px; /* 이미지 높이 고정 */
  object-fit: cover;
  border-radius: 8px;
  transition: filter 0.3s ease;

  &:hover {
    filter: blur(8px);
  }
`;

const CategoryText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; /* 너비를 80%로 설정 */
  height: auto; /* 높이를 자동으로 조절 */
  padding: 20px; /* 패딩 증가 */
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  color: #625656;
  font-size: 16px; /* 필요에 따라 글꼴 크기 조절 */
  text-align: center;
  visibility: hidden;
  white-space: pre-wrap;

  ${MainCategoryContainer}:hover & {
    visibility: visible;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 버튼이 잘리지 않도록 마진 조정 */
`;

const ButtonText = styled.div`
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  /* 필요한 추가 스타일링 */
`;

export default MainCategory;

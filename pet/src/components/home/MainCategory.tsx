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
  margin: 20px 80px;
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
  color: #625656;
  font-size: 24px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.7); 
  visibility: hidden; /* 기본적으로 숨김 */

  ${MainCategoryContainer}:hover & {
    visibility: visible; /* 호버 시 보임 */
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
  /* 필요한 추가 스타일링 */
`;

export default MainCategory;

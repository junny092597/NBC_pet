import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

const categories: string[] = ['강아지', '고양이', '그외'];
const Types: Record<string, string[]> = {
  강아지: ['사료', '간식', '놀이용품'],
  고양이: ['사료', '간식', '놀이용품'],
  그외: ['사료', '간식', '놀이용품'],
};

function Category({ selectedCategory, setSelectedCategory, setSelectedType }: CategoryProps): JSX.Element {
  const onClickCategory = (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
  };

  const onClickItem = (item: string) => {
    setSelectedType(item);
  };

  return (
    <SCategoryContainer>
      {categories.map(category => (
        <div key={category}>
          <SButtonContainer>
            <SCatagoryButton onClick={() => onClickCategory(category)} active={category === selectedCategory}>
              {category}
            </SCatagoryButton>
            {category === selectedCategory &&
              Types[category].map(item => (
                <SItemButton key={item} onClick={() => onClickItem(item)}>
                  {item}
                </SItemButton>
              ))}
          </SButtonContainer>
        </div>
      ))}
    </SCategoryContainer>
  );
}

export default Category;

const SCategoryContainer = styled.div`
  font-size: 20px;
  margin-top: 2%;
  width: 5vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
`;

const SCatagoryButton = styled.button<{ active?: boolean }>`
  margin-bottom: 5px;

  font-size: 20px;
  background-color: ${({ active }) => (active ? 'gray' : 'white')};
  cursor: pointer;
`;

const SButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between; // 버튼 간 여백을 최대화
  gap: 0.3vh;
`;

const SItemButton = styled.button<{ active?: boolean }>`
  margin-bottom: 5px;
  font-size: 15px;
  background-color: ${({ active }) => (active ? 'gray' : 'white')};
  cursor: blue;
`;

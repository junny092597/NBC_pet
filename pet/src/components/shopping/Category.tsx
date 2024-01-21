import React from 'react';
import styled from 'styled-components';

interface Item {
  id: number;
  가격: number;
  상품명: string;
  이미지: string;
}

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
  categoryItems: Record<string, string[]>;
  selectedItems: string[];
  itemsData: Item[];
}

function Category({
  selectedCategory,
  setSelectedCategory,
  setSelectedItems,
  categories,
  categoryItems,
  selectedItems,
  itemsData,
}: CategoryProps): JSX.Element {
  const onClickCategory = (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
  };

  const onClickItem = (item: any) => {
    setSelectedItems(prevItem => (prevItem === item ? null : item));
  };

  return (
    <SCategoryContainer>
      {categories.map(category => (
        <div key={category}>
          <SButtonContainer>
            <SItemButton onClick={() => onClickCategory(category)} active={category === selectedCategory}>
              {category}
            </SItemButton>
            {category === selectedCategory &&
              selectedItems.map(item => (
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
  width: 5vw;
  height: 5vh;
  display: flex;
  flex-direction: column;
`;

const SItemButton = styled.button<{ active?: boolean }>`
  margin-bottom: 5px;
  background-color: ${({ active }) => (active ? 'gray' : 'white')};
  cursor: pointer;
`;

const SButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between; // 버튼 간 여백을 최대화
`;

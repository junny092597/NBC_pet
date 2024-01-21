import React from 'react';
import styled from 'styled-components';

interface Item {
  id: number;
  가격: number;
  상품명: string;
  이미지: string;
}

interface ProductsProps {
  selectedCategory: string | null;
  selectedItems: any;
  categories: string[];
  itemsData: Item[];
}

function Products({ selectedCategory, selectedItems, categories, itemsData }: ProductsProps): JSX.Element {
  const ProductsHandler = () => {
    if (selectedCategory && categories.includes(selectedCategory)) {
      return (
        <SItemBoxContainer>
          {itemsData.map(item => (
            <SItemBox key={item.id}>
              <img src={item.이미지} alt={item.상품명} />
              <div>{item.상품명}</div>
              <div>{item.가격}원</div>
            </SItemBox>
          ))}
        </SItemBoxContainer>
      );
    } else {
    }
  };

  return (
    <>
      <SItemBoxContainer>{ProductsHandler()}</SItemBoxContainer>
    </>
  );
}

export default Products;

const SItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw; // 1열당 3개씩 나열하려면 여백을 고려하여 조절
  height: 30vh;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    max-width: 350px;
    max-height: 850px;
  }
`;

const SItemBoxContainer = styled.div`
  margin-left: 8vw;
  width: 80%;
  display: flex;
  flex-wrap: wrap; // 부모 너비를 넘어가면 다음 줄로 넘어가도록 함
  gap: 5vw;
`;

import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface Item {
  id: number;
  가격: number;
  상품명: string;
  이미지: string;
  category: string;
}

type SortOrder = 'new' | 'low' | 'high';

interface ProductsProps {
  selectedCategory: any;
  selectedItems: string[];
  categories: string[];
  itemsData: any;
}

function Products({ selectedCategory, selectedItems, categories, itemsData }: ProductsProps): JSX.Element {
  const ProductsHandler = () => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('new');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSortClick = (order: SortOrder) => {
      setSortOrder(order);
    };

    if (selectedCategory) {
      let filteredItems: Item[] = [];

      // selectedCategory가 categories 배열에 있는 경우
      if (categories[selectedCategory]) {
        filteredItems = itemsData.filter((item: { category: string }) =>
          categories[selectedCategory].includes(item.category)
        );
      } else {
        // selectedCategory가 categories 배열에 없는 경우 (전체 제품 보여주기)
        filteredItems = itemsData;
      }

      return (
        <>
          <SProductsButtonContainer>
            <SProductsButton onClick={() => handleSortClick('new')}>최신순</SProductsButton>
            <SProductsButton onClick={() => handleSortClick('low')}>낮은가격순</SProductsButton>
            <SProductsButton onClick={() => handleSortClick('high')}>높은가격순</SProductsButton>
          </SProductsButtonContainer>
          <SItemBoxContainer>
            {filteredItems.length > 0 && // 빈 배열인 경우 map 함수 호출하지 않음
              filteredItems.map(item => (
                <SItemBox key={item.id}>
                  <img src={item.이미지} alt={item.상품명} />
                  <STextBox>
                    <div>{item.상품명}</div>
                    <div>가격 : {item.가격}원</div>
                    <SBuyButton>구매하기</SBuyButton>
                  </STextBox>
                </SItemBox>
              ))}
          </SItemBoxContainer>
        </>
      );
    } else if (selectedItems.length > 0) {
      // selectedItems 배열이 비어 있지 않은 경우
      const filteredItems = itemsData.filter((item: Item) => selectedItems.includes(item.category));

      return (
        <SItemBoxContainer>
          {filteredItems.length > 0 &&
            filteredItems.map((item: Item) => (
              <SItemBox key={item.id}>
                <img src={item.이미지} alt={item.상품명} />
                <STextBox>
                  <div>{item.상품명}</div>
                  <div>{item.가격}원</div>
                  <SBuyButton>구매하기</SBuyButton>
                </STextBox>
              </SItemBox>
            ))}
        </SItemBoxContainer>
      );
    } else {
      return null; // selectedCategory가 null인 경우 아무 것도 렌더링하지 않음
    }
  };

  return <>{ProductsHandler()}</>;
}

export default Products;

const SProductsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5vh;
  gap: 10vw;
`;

const SProductsButton = styled.button`
  width: 15vh;
  height: 8vh;
`;

const SItemBox = styled.div`
  display: flex;
  width: 20vw;
  height: 20vh;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
  }

  img {
    max-width: 15vw;
    max-height: 30vh;
    object-fit: cover;
  }
`;

const SItemBoxContainer = styled.div`
  margin-left: 8vw;
  display: flex;
  flex-wrap: wrap; // 부모 너비를 넘어가면 다음 줄로 넘어가도록 함
  gap: 5vw;
`;

const STextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw; // 텍스트 박스의 너비를 50%로 조절
  padding: 0.5rem; // 텍스트 박스에 여백 추가
  box-sizing: border-box;
  justify-content: space-between;
  white-space: pre-line;
  font-size: 16px;
`;

const SBuyButton = styled.button`
  width: 5vw;
  height: 4vh;
  margin-left: 3vw;
`;

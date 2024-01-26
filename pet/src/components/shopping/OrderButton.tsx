import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

interface Item {
  id: number;
  price: number;
  name: string;
  img: string;
  category: string;
  type: string;
}
interface OrderButtonProps {
  renderData: Item[];
  setRenderData: React.Dispatch<React.SetStateAction<Item[]>>;
}

function OrderButton({ renderData, setRenderData }: OrderButtonProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const handleSortClick = (sortOrder: 'higePrice' | 'lowPrice' | 'new') => {
    const sorted = [...renderData];

    if (sortOrder === 'higePrice') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'lowPrice') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'new') {
      sorted.sort((a, b) => a.id - b.id);
    }
    setRenderData(sorted);
  };

  return (
    <>
      <SProductsButtonContainer>
        <SProductsButton active={isActive} onClick={() => handleSortClick('new')}>
          최신순
        </SProductsButton>
        <SProductsButton active={isActive} onClick={() => handleSortClick('higePrice')}>
          낮은가격순
        </SProductsButton>
        <SProductsButton active={isActive} onClick={() => handleSortClick('lowPrice')}>
          높은가격순
        </SProductsButton>
        <SinputWrapper>
          <SsearchInput placeholder="제품을 검색해주세요" />
          <SsearchButton>검색하기</SsearchButton>
        </SinputWrapper>
      </SProductsButtonContainer>
    </>
  );
}

export default OrderButton;
const SProductsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 10vh;
  gap: 5.5vw;
  height: 3vh;
  margin-left: 0.6vw;
  margin-top: 3vh;
`;

const SProductsButton = styled.button<{ active?: boolean }>`
  margin-bottom: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? 'yello' : 'black')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline; /* 마우스 호버 시 텍스트에 밑줄 추가 */
  }
`;
const SinputWrapper = styled.div`
  margin-left: 29vw;
`;

const SsearchInput = styled.input`
  margin-right: 0.8vw;
`;
const SsearchButton = styled.button``;

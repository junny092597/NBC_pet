import React from 'react';
import styled from 'styled-components';

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
  console.log();
  return (
    <>
      <SProductsButtonContainer>
        <SProductsButton onClick={() => handleSortClick('new')}>최신순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick('higePrice')}>낮은가격순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick('lowPrice')}>높은가격순</SProductsButton>
      </SProductsButtonContainer>
    </>
  );
}

export default OrderButton;
const SProductsButtonContainer = styled.span`
  display: flex;
  flex-direction: row;
  margin-left: 20vw;
  gap: 10vw;
  height: 3vh;
`;

const SProductsButton = styled.button`
  width: 15vh;
  height: 3vh;
`;

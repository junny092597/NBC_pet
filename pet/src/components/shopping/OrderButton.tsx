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

interface OrderButtonProps {}

type SortOrder = 'new' | 'low' | 'high';

function OrderButton() {
  const handleSortClick = () => {};

  return (
    <>
      <SProductsButtonContainer>
        <SProductsButton onClick={() => handleSortClick()}>최신순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick()}>낮은가격순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick()}>높은가격순</SProductsButton>
      </SProductsButtonContainer>
    </>
  );
}

export default OrderButton;
const SProductsButtonContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 20vw;
  gap: 10vw;
  height: 3vh;
`;

const SProductsButton = styled.button`
  width: 15vh;
  height: 3vh;
`;

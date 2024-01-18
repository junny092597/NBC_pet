// Shopping.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Category from '../components/shopping/Category';
import Items from '../components/shopping/Items';

function Shopping() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<any>();

  return (
    <>
      <SComponentsContainer>
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Items selectedCategory={selectedCategory} selectedItems={selectedItems} />
      </SComponentsContainer>
    </>
  );
}

const SComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Shopping;

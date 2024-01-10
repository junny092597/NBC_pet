import React from 'react';
import styled from 'styled-components';
import Category from '../components/shopping/Category';
import Items from '../components/shopping/Items';

function Shopping() {
  return (
    <>
      <SComponentsContainer>
        <Category />
        <Items />
      </SComponentsContainer>
    </>
  );
}

const SComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Shopping;

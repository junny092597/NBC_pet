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
interface ProductsProps {
  selectedCategory: string | null;
  selectedType: string;
  itemsData: Item[];
  filteredItmes: Item[];
}

function Products({ selectedCategory, selectedType, itemsData }: ProductsProps): JSX.Element {
  return (
    <>
      <SItemBoxContainer>
        {/* //UI에 제품이 보이게 해주는 코드 */}
        {itemsData.map(Product => {
          return (
            <SItemBox>
              <SImgBox>
                <img src={Product.img} alt="Product Image" />
              </SImgBox>
              <STextBox>
                <div>제품명 : {Product.name}</div>
                <div> 가격 : {Product.price}</div>
                <button>구매하기</button>
              </STextBox>
            </SItemBox>
          );
        })}
      </SItemBoxContainer>
    </>
  );
}

export default Products;

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
    max-width: 100%;
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

const SImgBox = styled.div`
  display: flex;
  width: 50%;
  padding: 0.5rem;
  // 텍스트 박스에 여백 추가
`;

const STextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%; // 텍스트 박스의 너비를 50%로 조절
  padding: 0.5rem; // 텍스트 박스에 여백 추가
  margin-left: 0.5vw;
  box-sizing: border-box;
  justify-content: space-between;
  white-space: pre-line;
  font-size: 15px;
`;

const SBuyButton = styled.button`
  width: 5vw;
  height: 4vh;
  margin-left: 3vw;
`;

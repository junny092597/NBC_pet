import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderButton from './OrderButton';

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
  filteredItems: Item[];
}

function Products({ selectedCategory, selectedType, itemsData, filteredItems }: ProductsProps): JSX.Element {
  // 렌더링에 사용할 데이터를 저장할 상태
  const [renderData, setRenderData] = useState<Item[]>([]);

  // 컴포넌트가 처음 마운트될 때와 selectedCategory가 변경될 때 실행되는 useEffect
  useEffect(() => {
    // 첫 렌더링 시에는 itemsData 사용
    setRenderData(itemsData);
  }, [itemsData]);

  // selectedCategory가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // selectedCategory에 따라 적절한 데이터 설정
    if (selectedCategory) {
      setRenderData(filteredItems);
    } else {
      setRenderData(itemsData);
    }
  }, [selectedCategory, filteredItems, itemsData]);

  return (
    <>
      <SItemBoxContainer>
        {/* UI에 제품이 보이게 해주는 코드 */}
        <OrderButtonBox>
          <OrderButton renderData={renderData} setRenderData={setRenderData} />
        </OrderButtonBox>
        {renderData.map(Product => (
          <SItemBox key={Product.id}>
            <SImgBox>
              <img src={Product.img} alt="Product Image" />
            </SImgBox>
            <STextBox>
              <div>{Product.name}</div>
              <div> 가격 : {Product.price}원</div>
              <button>구매하기</button>
            </STextBox>
          </SItemBox>
        ))}
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

const OrderButtonBox = styled.div`
  margin-top: 0.5vh;
  width: 100%;
`;

const SItemBoxContainer = styled.div`
  margin-left: 8vw;
  width: 100%;
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

// const SBuyButton = styled.button`
//   width: 5vw;
//   height: 4vh;
//   margin-left: 3vw;
// `;

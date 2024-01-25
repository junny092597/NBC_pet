import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderButton from './OrderButton';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  price: number;
  name: string;
  img: string;
  category: string;
  type: string;
}
interface ProductsProps {
  renderData: Item[];
  setRenderData: React.Dispatch<React.SetStateAction<Item[]>>;
  page: number;
}

function Products({ renderData, setRenderData, page }: ProductsProps): JSX.Element {
  const handlePageChange = (page: React.SetStateAction<number>) => {
    // setPage(page);
  };

  const navigate = useNavigate();
  const moveToDeatailPageHandler = (item: any) => {
    if (renderData) navigate(`/ShoppingDetail/${item.name}`, { state: { item } });
  };
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
              <button onClick={() => moveToDeatailPageHandler(Product)}>구매하기</button>
            </STextBox>
          </SItemBox>
        ))}
        {/* 페이지네이션 기능 추가중 */}
        {/* <Pagination
          activePage={page}
          itemsCountPerPage={6}
          totalItemsCount={27}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        /> */}
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

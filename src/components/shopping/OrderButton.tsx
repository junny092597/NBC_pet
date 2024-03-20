import React, { useEffect } from 'react';
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
  itemsData: Item[];
  selectedCategory: string;
  selectedType: string;
  renderData: Item[];
  setRenderData: React.Dispatch<React.SetStateAction<Item[]>>;
}

function OrderButton({
  itemsData,
  selectedType,
  selectedCategory,
  renderData,
  setRenderData,
}: OrderButtonProps): JSX.Element {
  const [activeSort, setActiveSort] = useState<'new' | 'higePrice' | 'lowPrice' | null>(null);
  const [inputIndex, setInputIndex] = useState<string>('');
  const [originalData, setOriginalData] = useState<Item[]>([]);

  console.log('originalData', originalData);
  useEffect(() => {
    setOriginalData(itemsData);
    setInputIndex('');
  }, [renderData]);

  useEffect(() => {
    setActiveSort(null);
  }, [selectedCategory, selectedType]);

  const handleSortClick = (sortOrder: 'higePrice' | 'lowPrice' | 'new') => {
    const sorted = [...originalData];

    if (sortOrder === 'higePrice') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'lowPrice') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'new') {
      sorted.sort((a, b) => a.id - b.id);
    }
    setRenderData(sorted);
    setActiveSort(prevSort => (prevSort === sortOrder ? null : sortOrder));
  };

  const searchData = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputIndex(e.target.value);
  };

  const searchOnclickHandler = () => {
    // 검색어에 따라 최초의 renderData를 기준으로 데이터를 필터링합니다.
    const newFilteredData = originalData.filter(item => item.name.includes(inputIndex));

    // 필터링된 데이터로 UI를 업데이트합니다.
    setOriginalData(newFilteredData);
    setRenderData(newFilteredData);
    setInputIndex('');
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchOnclickHandler();
    }
  };

  return (
    <>
      <SProductsButtonContainer>
        <SProductsButton active={activeSort === 'new'} onClick={() => handleSortClick('new')}>
          최신순
        </SProductsButton>
        <SProductsButton active={activeSort === 'higePrice'} onClick={() => handleSortClick('higePrice')}>
          낮은가격순
        </SProductsButton>
        <SProductsButton active={activeSort === 'lowPrice'} onClick={() => handleSortClick('lowPrice')}>
          높은가격순
        </SProductsButton>
        <SinputWrapper>
          <SsearchInput
            type="text"
            value={inputIndex}
            placeholder="제품을 검색해주세요"
            onChange={searchData}
            onKeyDown={handleEnterKey}
          />
          <SsearchButton onClick={searchOnclickHandler}>검색하기</SsearchButton>
        </SinputWrapper>
      </SProductsButtonContainer>
    </>
  );
}

export default OrderButton;
const SProductsButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  height: 10vh;
  height: 3vh;
  margin-left: 0.6vw;
  margin-top: 3vh;
`;

const SProductsButton = styled.button<{ active?: boolean }>`
  font-family: GmarketSansMedium;
  margin-bottom: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? 'gray' : 'black')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};

  &:hover {
    color: ${({ active }) => (active ? 'gray' : 'black')};
    color: gray; /* 마우스 호버 시 텍스트에 밑줄 추가 */
  }
`;
const SinputWrapper = styled.div`
  margin-left: 29vw;
`;

const SsearchInput = styled.input`
  margin-right: 0.8vw;
`;
const SsearchButton = styled.button``;

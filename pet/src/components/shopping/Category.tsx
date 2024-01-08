import React, { useState } from 'react';
import styled from 'styled-components';

function Category() {
  // 강아지, 고양이, 그 외의 카테고리
  const categories = ['강이지', '고양이', '그외'];

  // 각 카테고리에 속하는 아이템
  const items: Record<string, string[]> = {
    강이지: ['사료', '간식', '놀이용품'],
    고양이: ['사료', '간식', '놀이용품'],
    그외: ['사료', '간식', '놀이용품'],
  };

  // 현재 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onClickCategory = (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
  };

  return (
    <>
      <div>'카테고리'</div>
      {/* 최상단 버튼 카테고리 */}
      <SCategoryContainer>
        {categories.map(category => (
          <div key={category}>
            <SItemButton onClick={() => onClickCategory(category)} active={category === selectedCategory}>
              {category}
            </SItemButton>
            {category === selectedCategory &&
              items[selectedCategory].map(item => <SItemButton key={item}>{item}</SItemButton>)}
          </div>
        ))}
      </SCategoryContainer>
    </>
  );
}

export default Category;

const SCategoryContainer = styled.div`
  width: 5vw;
  height: 5vh;
  display: flex;
  flex-direction: column;
`;

const SItemButton = styled.button<{ active?: boolean }>`
  margin-bottom: 5px; /* 각 버튼 사이의 간격 조절 */
  background-color: ${({ active }) => (active ? 'lightblue' : 'white')};
  cursor: pointer;
`;

import React, { useState } from 'react';

function Category() {
  // 강아지, 고양이, 그 외의 카테고리
  const categories = ['강이지', '고양이', '그외'];

  // 각 카테고리에 속하는 아이템
  const item: Record<string, string[]> = {
    강이지: ['사료', '간식', '놀이용품'],
    고양이: ['사료', '간식', '놀이용품'],
    그외: ['사료', '간식', '놀이용품'],
  };

  // 현재 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onClickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div>'카테고리'</div>
      {/* 최상단 버튼 카테고리 */}
      <div>
        {categories.map(category => (
          <button key={category} onClick={() => onClickCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* 선택된 카테고리에 속하는 아이템 버튼들 */}
      <div>{selectedCategory && item[selectedCategory].map(item => <button key={item}>{item}</button>)}</div>
    </>
  );
}

export default Category;

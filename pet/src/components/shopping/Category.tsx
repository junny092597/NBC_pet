import React from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase/firebase';

interface Item {
  id: string;
  Price: number;
  상품명: string;
  이미지: string;
}

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

function Category({ selectedCategory, setSelectedCategory }: CategoryProps): JSX.Element {
  const categories: string[] = ['강아지', '고양이', '그외'];
  const items: Record<string, string[]> = {
    강아지: ['사료', '간식', '놀이용품'],
    고양이: ['사료', '간식', '놀이용품'],
    그외: ['사료', '간식', '놀이용품'],
  };

  const onClickCategory = async (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));

    if (category !== selectedCategory) {
      try {
        const itemsCollection = collection(db, 'DogsFood', category);
        const itemsSnapshot = await getDocs(itemsCollection);
        let itemsData: Item[] = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          Price: doc.data().Price,
          상품명: doc.data().상품명,
          이미지: doc.data().이미지,
        }));

        console.log(itemsData);
      } catch (error) {
        console.error('Firestore에서 아이템을 가져오는 중 에러 발생:', error);
      }
    }
  };

  return (
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
  margin-bottom: 5px;
  background-color: ${({ active }) => (active ? 'gray' : 'white')};
  cursor: pointer;
`;

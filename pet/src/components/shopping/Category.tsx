import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Item {
  id: number;
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
  const categoryItems: Record<string, string[]> = {
    강아지: ['사료', '간식', '놀이용품'],
    고양이: ['사료', '간식', '놀이용품'],
    그외: ['사료', '간식', '놀이용품'],
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemsData, setItemsData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async (category: string) => {
      try {
        const itemsCollection = collection(db, 'DogsFood');
        const categoryQuery = query(itemsCollection);

        const itemsSnapshot = await getDocs(categoryQuery);
        const itemsData: Item[] = itemsSnapshot.docs.map(doc => ({
          id: doc.data().id,
          Price: doc.data().Price,
          상품명: doc.data().상품명,
          이미지: doc.data().이미지,
        }));
        console.log({ itemsData });
        setItemsData(itemsData);
      } catch (error) {
        console.error('Firestore에서 아이템을 가져오는 중 에러 발생:', error);
      }
    };

    if (selectedCategory) {
      setSelectedItems(categoryItems[selectedCategory]);
      fetchData(selectedCategory);
    }
  }, [selectedCategory]);

  const onClickCategory = (category: string) => {
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
  };

  const onClickItem = (item: any) => {
    // 아이템 클릭 시 할 일을 정의하세요.
  };

  return (
    <SCategoryContainer>
      {categories.map(category => (
        <div key={category}>
          <SItemButton onClick={() => onClickCategory(category)} active={category === selectedCategory}>
            {category}
          </SItemButton>
          {category === selectedCategory &&
            selectedItems.map(item => (
              <SItemButton key={item} onClick={() => onClickItem(item)}>
                {item}
              </SItemButton>
            ))}
          {category === selectedCategory &&
            itemsData.map(item => (
              <SItemBox key={item.id} onClick={() => onClickItem(item)}>
                <div>{item.상품명}</div>
                <div>{item.Price}원</div>
                <img src={item.이미지} alt={item.상품명} />
              </SItemBox>
            ))}
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

const SItemBox = styled.div`
  width: 20vw;
  height: 20vh;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    max-width: 100px;
    max-height: 100px;
  }
`;

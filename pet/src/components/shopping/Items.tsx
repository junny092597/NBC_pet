import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Item {
  id: number;
  Price: number;
  상품명: string;
  이미지: string;
}

type SortOrder = 'new' | 'low' | 'high';

interface ItemsProps {
  selectedCategory: string | null;
  selectedItems: string[];
}

function Items({ selectedCategory }: ItemsProps): JSX.Element {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('new');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchItemsFromFirestore = async (): Promise<void> => {
  //     try {
  //       if (selectedCategory) {
  //         // Firestore에서 해당 카테고리의 아이템을 가져옵니다.
  //         const itemsCollection = collection(db, selectedCategory); // selectedCategory를 직접 컬렉션 이름으로 사용
  //         const itemsSnapshot = await getDocs(itemsCollection);
  //         let itemsData: Item[] = itemsSnapshot.docs
  //           .filter(doc => doc.data().category === selectedCategory) // 여기서 'category'는 실제 문서 내의 카테고리 필드입니다.
  //           .map(doc => ({
  //             id: doc.data().id,
  //             Price: doc.data().Price,
  //             상품명: doc.data().상품명,
  //             이미지: doc.data().이미지,
  //           }));

  //         // 정렬 조건에 따라 아이템을 정렬합니다
  //         switch (sortOrder) {
  //           case 'new':
  //             itemsData = itemsData.sort((a, b) => b.id.localeCompare(a.id));
  //             break;
  //           case 'low':
  //             itemsData = itemsData.sort((a, b) => a.Price - b.Price);
  //             break;
  //           case 'high':
  //             itemsData = itemsData.sort((a, b) => b.Price - a.Price);
  //             break;
  //           default:
  //             break;
  //         }

  //         setItems(itemsData);
  //       }
  //     } catch (error) {
  //       console.error('Firestore에서 아이템을 가져오는 중 에러 발생:', error);
  //     }
  //   };

  //   fetchItemsFromFirestore();
  // }, [selectedCategory, sortOrder]);

  const handleSortClick = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItems(prevSelectedItems => {
      const itemIndex = prevSelectedItems.indexOf(itemName);
      if (itemIndex !== -1) {
        return [...prevSelectedItems.slice(0, itemIndex), ...prevSelectedItems.slice(itemIndex + 1)];
      } else {
        return [...prevSelectedItems, itemName];
      }
    });
  };

  return (
    <>
      <div>
        <SProductsButton>인기상품</SProductsButton>
        <SProductsButton onClick={() => handleSortClick('new')}>최신순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick('low')}>낮은가격순</SProductsButton>
        <SProductsButton onClick={() => handleSortClick('high')}>높은가격순</SProductsButton>
        <SProductsButton>판매량순</SProductsButton>
      </div>
      {/* <div>
        {items.map(item => (
          <div key={item.id} onClick={() => handleItemClick(item.상품명)}>
            <img src={item.이미지} alt={item.상품명} style={{ width: '100px', height: '100px' }} />
            <p>
              {item.상품명} - {item.Price}원
            </p>
          </div>
        ))}
      </div> */}
    </>
  );
}

const SProductsButton = styled.button`
  width: 15vh;
  height: 3vh;
`;

export default Items;

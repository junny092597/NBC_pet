import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../Firebase'

interface Item {
  id: number;
  가격: number;
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
        // 초기화
        setItemsData([]);

        if (category === '강아지') {
          // DogsFood 컬렉션 데이터 가져오기
          const dogsFoodCollection = collection(db, 'DogsFood');
          const dogsFoodQuery = query(dogsFoodCollection);
          const dogsFoodSnapshot = await getDocs(dogsFoodQuery);
          const dogsFoodData: Item[] = dogsFoodSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // DogsSnack 컬렉션 데이터 가져오기
          const dogsSnackCollection = collection(db, 'DogsSnack');
          const dogsSnackQuery = query(dogsSnackCollection);
          const dogsSnackSnapshot = await getDocs(dogsSnackQuery);
          const dogsSnackData: Item[] = dogsSnackSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // DogsPlay 컬렉션 데이터 가져오기
          const dogsPlayCollection = collection(db, 'DogsPlay');
          const dogsPlayQuery = query(dogsPlayCollection);
          const dogsPlaySnapshot = await getDocs(dogsPlayQuery);
          const dogsPlayData: Item[] = dogsPlaySnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // 데이터 합치기
          const allItemsData = [...dogsFoodData, ...dogsSnackData, ...dogsPlayData];
          console.log({ allItemsData });
          setItemsData(allItemsData);
        } else if (category === '고양이') {
          // CatsFood 컬렉션 데이터 가져오기
          const catsFoodCollection = collection(db, 'CatsFood');
          const catsFoodQuery = query(catsFoodCollection);
          const catsFoodSnapshot = await getDocs(catsFoodQuery);
          const catsFoodData: Item[] = catsFoodSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // CatsSnack 컬렉션 데이터 가져오기
          const catsSnackCollection = collection(db, 'CatsSnack');
          const catsSnackQuery = query(catsSnackCollection);
          const catsSnackSnapshot = await getDocs(catsSnackQuery);
          const catsSnackData: Item[] = catsSnackSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // CatsPlay 컬렉션 데이터 가져오기
          const catsPlayCollection = collection(db, 'CatsPlay');
          const catsPlayQuery = query(catsPlayCollection);
          const catsPlaySnapshot = await getDocs(catsPlayQuery);
          const catsPlayData: Item[] = catsPlaySnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // 데이터 합치기
          const allItemsData = [...catsFoodData, ...catsSnackData, ...catsPlayData];
          console.log({ allItemsData });
          setItemsData(allItemsData);
        } else if (category === '그외') {
          // OthersFood 컬렉션 데이터 가져오기
          const othersFoodCollection = collection(db, 'OthersFood');
          const othersFoodQuery = query(othersFoodCollection);
          const othersFoodSnapshot = await getDocs(othersFoodQuery);
          const othersFoodData: Item[] = othersFoodSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // OthersSnack 컬렉션 데이터 가져오기
          const othersSnackCollection = collection(db, 'OthersSnack');
          const othersSnackQuery = query(othersSnackCollection);
          const othersSnackSnapshot = await getDocs(othersSnackQuery);
          const othersSnackData: Item[] = othersSnackSnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // OthersPlay 컬렉션 데이터 가져오기
          const otehrsPlayCollection = collection(db, 'OthersPlay');
          const otehrsPlayQuery = query(otehrsPlayCollection);
          const otehrsPlaySnapshot = await getDocs(otehrsPlayQuery);
          const otehrsPlayData: Item[] = otehrsPlaySnapshot.docs.map(doc => ({
            id: doc.data().id,
            가격: doc.data().가격,
            상품명: doc.data().상품명,
            이미지: doc.data().이미지,
          }));

          // 데이터 합치기
          const allItemsData = [...othersFoodData, ...othersSnackData, ...otehrsPlayData];
          console.log({ allItemsData });
          setItemsData(allItemsData);
        }
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
          <SButtonContainer>
            <SItemButton onClick={() => onClickCategory(category)} active={category === selectedCategory}>
              {category}
            </SItemButton>
            {category === selectedCategory &&
              selectedItems.map(item => (
                <SItemButton key={item} onClick={() => onClickItem(item)}>
                  {item}
                </SItemButton>
              ))}
          </SButtonContainer>
        </div>
      ))}
      <SItemBoxContainer>
        {selectedCategory &&
          itemsData.map(item => (
            <SItemContainer key={item.id}>
              <SItemBox onClick={() => onClickItem(item)}>
                <img src={item.이미지} alt={item.상품명} />
                <div>{item.상품명}</div>
                <div>{item.가격}원</div>
              </SItemBox>
            </SItemContainer>
          ))}
      </SItemBoxContainer>
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

const SCategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap; // 아이템을 여러 행에 걸쳐 나열하도록 함
  background-color: red;
`;
const SItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(30vw - 20px); // 1열당 3개씩 나열하려면 여백을 고려하여 조절
  height: 30vh;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    max-width: 350px;
    max-height: 850px;
  }
`;

const SButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between; // 버튼 간 여백을 최대화
`;

const SItemContainer = styled.div`
  width: calc(30vw - 20px); // 1열당 3개씩 나열하려면 여백을 고려하여 조절
  margin: 5px; // 각 아이템 간 여백 추가
  gap: 10px;
`;

const SItemBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // 부모 너비를 넘어가면 다음 줄로 넘어가도록 함
  gap: 10px; // 아이템 간 여백 조절
`;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Category from '../components/shopping/Category';
import Items from '../components/shopping/Items';
import Products from '../components/shopping/products';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../Firebase';

interface Item {
  id: number;
  가격: number;
  상품명: string;
  이미지: string;
}

function Shopping() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const categories: string[] = ['강아지', '고양이', '그외'];
  const categoryItems: Record<string, string[]> = {
    강아지: ['사료', '간식', '놀이용품'],
    고양이: ['사료', '간식', '놀이용품'],
    그외: ['사료', '간식', '놀이용품'],
  };

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

  return (
    <>
      <SComponentsContainer>
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedItems={setSelectedItems}
          categories={categories}
          categoryItems={categoryItems}
          selectedItems={selectedItems}
          itemsData={itemsData}
        />
        <Items selectedCategory={selectedCategory} selectedItems={selectedItems} />
      </SComponentsContainer>
      <Products
        selectedCategory={selectedCategory}
        selectedItems={selectedItems}
        categories={categories}
        itemsData={itemsData}
      />
    </>
  );
}

const SComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Shopping;

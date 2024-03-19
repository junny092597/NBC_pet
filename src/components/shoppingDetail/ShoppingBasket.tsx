import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import { db } from '../../Firebase';
import { where, query, getDocs } from 'firebase/firestore';

interface ShoppingBasetProps {
  data: {
    userEmail: string;
    itemName?: string | undefined;
  };
  item: {
    price: number;
    category: string;
    id: number;
    type: string;
  };
}

function ShoppingBasket({ data, item }: ShoppingBasetProps): JSX.Element {
  async function addToShoppingBasket(userEmail: string, itemName: string | undefined) {
    const shoppingBasketRef = collection(db, 'shoppingbasket');

    // 이미 해당 userEmail, itemName이 존재하는지 확인하는 쿼리
    const q = query(shoppingBasketRef, where('userEmail', '==', userEmail), where('item', '==', itemName));
    const querySnapshot = await getDocs(q);

    // 이미 존재하는 경우 업데이트, 아닌 경우 추가
    if (querySnapshot.size > 0) {
      // 기존 문서가 존재할 때
      alert('이미 장바구니에 추가된 상품입니다.');
    } else {
      // 새로운 문서 추가
      await addDoc(shoppingBasketRef, {
        userEmail: userEmail,
        item: itemName,
        price: item.price,
        category: item.category,
        id: item.id,
        type: item.type,
      });
      alert('장바구니에 추가되었습니다.');
    }
  }

  const addToCartOnclickHandler = () => {
    addToShoppingBasket(data.userEmail, data.itemName);
  };

  return <SAddToCartButton onClick={addToCartOnclickHandler}>ADD To Cart</SAddToCartButton>;
}

export default ShoppingBasket;

const SAddToCartButton = styled.button`
  width: 10vw;
  height: 5vh;
  border: 1px solid black;
  border-radius: 40px;
  background: none;
  padding: 0;
  cursor: pointer;
  margin: 0 1vw;
  background-color: ${({ theme }) => theme.color.ButtonColor2};
`;

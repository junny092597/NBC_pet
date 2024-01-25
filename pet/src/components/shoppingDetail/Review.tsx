import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

interface User {
  email: string;
  index: string;
}

interface ReviewProps {
  data: {
    userEmail: string;
    itemName?: string | undefined;
  };
}

function Review({ data }: ReviewProps): JSX.Element {
  const [index, setIndex] = useState('');
  const [reviews, setReviews] = useState<User[]>([]);

  //게시글 데이터베이스에 추가기능
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where('email', '==', data.userEmail));
      const querySnapshot = await getDocs(q);
      const reviewsData: User[] = [];
      querySnapshot.forEach(doc => {
        reviewsData.push(doc.data() as User);
      });
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [data]);

  //게시글작성버튼 기능
  const textPushHandler = async () => {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        email: data.userEmail,
        index: index,
        category: data.itemName,
      });

      console.log('게시글이 성공적으로 작성되었습니다. Document ID:', docRef.id);

      //게시글 데이터베이스에 수정기능
      const q = query(collection(db, 'reviews'), where('email', '==', data.userEmail));
      const querySnapshot = await getDocs(q);
      const reviewsData: User[] = [];
      querySnapshot.forEach(doc => {
        reviewsData.push(doc.data() as User);
      });
      setReviews(reviewsData);
      setIndex('');
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
    }
  };

  //삭제하기버튼 기능
  const deleteReviewHandler = async (documentId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', documentId));
      console.log('게시글이 성공적으로 삭제되었습니다.');

      const q = query(collection(db, 'reviews'), where('email', '==', data.userEmail));
      const querySnapshot = await getDocs(q);
      const reviewsData: User[] = [];
      querySnapshot.forEach(doc => {
        reviewsData.push(doc.data() as User);
      });
      const updatedReviews = reviews.filter(review => review.index !== documentId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  };

  return (
    <>
      <h2>Review 게시판</h2>
      <STextArea placeholder="게시글을 작성해주세요" onChange={e => setIndex(e.target.value)} />
      <button onClick={textPushHandler}>작성하기</button>

      <ul>
        {reviews.map(review => (
          <li key={review.index}>
            <span>{review.index}</span>
            <button onClick={() => deleteReviewHandler(review.index)}>삭제하기</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Review;

const STextArea = styled.textarea`
  resize: none;
`;

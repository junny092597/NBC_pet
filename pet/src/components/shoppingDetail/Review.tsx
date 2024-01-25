import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

interface Reviews {
  id: string;
  email: string;
  itemName?: string | undefined;
  index: string;
}

interface ReviewProps {
  data: {
    userEmail: string;
    itemName?: string | undefined;
  };
}

function Review({ data }: ReviewProps): JSX.Element {
  // 리뷰 내용 상태
  const [index, setIndex] = useState<string>('');
  //리뷰목록 상태
  const [reviews, setReviews] = useState<Reviews[]>([]);

  useEffect(() => {
    // 데이터 상태 업데이트
    const fetchReviews = async () => {
      if (data.itemName) {
        const q = query(collection(db, 'reviews'), where('itemName', '==', data.itemName));
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reviews));
        setReviews(reviewsData);
      }
    };

    fetchReviews();
  }, [data.itemName]);

  const handleWriteReview = async () => {
    if (index.trim() === '') {
      alert('게시글을 작성해주세요.');
      return;
    }

    try {
      const reviewRef = await addDoc(collection(db, 'reviews'), {
        email: data.userEmail,
        itemName: data.itemName,
        index: index,
      });

      setReviews(prevReviews => [
        ...prevReviews,
        { id: reviewRef.id, email: data.userEmail, itemName: data.itemName, index: index },
      ]);
      setIndex('');
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생: ', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));

      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생: ', error);
    }
  };

  return (
    <>
      <h2>Review</h2>
      <STextArea placeholder="게시글을 작성해주세요" onChange={e => setIndex(e.target.value)} value={index} />
      <button onClick={handleWriteReview}>작성하기</button>

      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.index}</p>
          <button onClick={() => handleDeleteReview(review.id)}>삭제하기</button>
        </div>
      ))}
    </>
  );
}

export default Review;

const STextArea = styled.textarea`
  resize: none;
`;

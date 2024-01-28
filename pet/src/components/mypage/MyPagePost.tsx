import React, { useEffect, useState } from 'react';
import * as S from './style';
import { db } from '../../Firebase';
import { auth } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export type Review = {
  id: string;
  email: string;
  index: number;
  itemName: string;
};

const MyPagePost = () => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<any>(auth.currentUser?.email);
  const currentUserInfos = auth.currentUser; // 현재 로그인한 사용자의 정보들(파이어베이스)
  // const [currentUser, setCurrentUser] = useState<any>(''); // 현재 로그인한 사용자 가져오기

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = collection(db, 'reviews');
        const querySnapshot = await getDocs(q);

        const reviewsData: Review[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.email === currentUserInfos?.email) {
            reviewsData.push({
              id: doc.id,
              email: data.email,
              index: data.index,
              itemName: data.itemName,
            });
          }
        });
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentUserInfos]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <S.AllPostContainer>
      <S.TitleContainer>등록게시글</S.TitleContainer>
      {reviews.length > 0 ? (
        <S.ReviewContainer>
          {reviews.map(review => (
            <S.PostContainer
              key={review.id}
            >
              <S.TextContainer>
                <S.TextEmail> {review.email}</S.TextEmail>
                <S.TextIndex> {review.index}</S.TextIndex>
                <S.TextItem> {review.itemName}</S.TextItem>
              </S.TextContainer>
            </S.PostContainer>
          ))}
        </S.ReviewContainer>
      ) : (
        <S.NoPostsContainer>
          <h2>등록된 게시글이 없습니다</h2>
          <Link to="Community">
            <>게시글 등록하기</>
          </Link>
        </S.NoPostsContainer>
      )}
    </S.AllPostContainer>
  );
};
export default MyPagePost;

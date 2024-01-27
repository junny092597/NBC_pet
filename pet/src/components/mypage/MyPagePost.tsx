import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom';
import NoResults from './NoPosts';
import * as S from './style';
import { db } from '../../Firebase';
import { auth } from '../../Firebase';
import { collection, getDocs, where } from 'firebase/firestore';
import test1 from '../../assets/images/logo.png';

export type Review = {
  id: string;
  email: string;
  index: number;
  itemName: string;
};

const MyPagePost = () => {
  // const user = useRecoilValue(userInfo);
  // const userInfos = user.userInfomation;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  // const userEmail = user.userInfomation.email;
  const [email, setEmail] = useState<any>(auth.currentUser?.email);
  const currentUserInfos = auth.currentUser; // 현재 로그인한 사용자의 정보들(파이어베이스)
  const [currentUser, setCurrentUser] = useState<any>(''); // 현재 로그인한 사용자 가져오기

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
      {reviews.length === 0 ? (
        <NoResults />
      ) : (
        <S.ReviewContainer>
          {reviews.map(review => (
            <S.PostContainer
              key={review.id}
              // src={!imageURL ? test1:imageURL}>
            // eslint-disable-next-line jsx-a11y/alt-text
            ><img src={test1}/>
              <S.TextContainer>
                <S.TextEmail> {review.email}</S.TextEmail>
                <S.TextIndex> {review.index}</S.TextIndex>
                <S.TextItem> {review.itemName}</S.TextItem>
              </S.TextContainer>
            </S.PostContainer>
          ))}
        </S.ReviewContainer>
      )}
    </S.AllPostContainer>
  );
};
export default MyPagePost;

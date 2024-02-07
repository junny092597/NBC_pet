import { SyntheticEvent, useEffect, useState } from 'react';
import * as S from '../postpage/MyPagePoststyle';
import { db, auth } from '../../../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import NoPosts from '../NoPosts';
import defaultImg from '../../../assets/images/Caticon1.png';

export type Like = {
  id: string;
  itemName: string;
  liked: boolean;
  userEmail: string;
  img: string;
name:string;
};

const MyPageReview = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [isall, setIsall] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const q = query(
                    collection(db, 'like'),
                    where('userEmail', '==', currentUser.email), // 현재 로그인한 사용자의 이메일과 일치하는 항목만 가져오도록 필터링
                    where('liked', '==', true) // 'liked' 필드가 true인 항목만 가져오도록 설정
                  );
                  const querySnapshot = await getDocs(q);
                  const likeData: Like[] = [];
                  querySnapshot.forEach(doc => {
                    const data = doc.data();
                    likeData.push({
                      id: doc.id,
                      itemName: data.itemName,
                      liked: data.liked,
                      userEmail: data.userEmail,
                      img: data.img,
                      name:data.name,

                    });
                  });
                  setLikes(likeData);
                  setLoading(false);
                }
              } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
              }
            };
        
            fetchPosts();
          }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const viewAllHandler = () => {
    setIsall(prevState => !prevState);
  };

 const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };


  return (
    <S.AllPostContainer>
      {likes.length > 0 ? (
        <>
          <S.ReviewContainer>
            {likes.map(liks => (
              <Link key={liks.id} to={`/ShoppingDetail/${liks.id}`}>      
                <S.PostContainer>
                <S.PostImgContainer src={liks.img} onError={addDefaultImg} />
                  <S.TextContainer>
                    <S.TextTitle>{liks.itemName}</S.TextTitle>
                    <S.TextIndex>{liks.liked.toString()}</S.TextIndex>
                  </S.TextContainer>
                </S.PostContainer>
              </Link>
            ))}
          </S.ReviewContainer>
          <S.PostContainerBtn onClick={() => setIsall(prevState => !prevState)}>
          {isall ? '접기' : '펼치기'}

          </S.PostContainerBtn>
        </>
      ) : (
        <S.NoPostsContainer>
          <NoPosts />
        </S.NoPostsContainer>
      )}
    </S.AllPostContainer>
  );
};

export default MyPageReview;

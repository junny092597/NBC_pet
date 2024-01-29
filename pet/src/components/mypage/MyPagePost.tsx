import React, { SyntheticEvent, useEffect, useState } from 'react';
import * as S from './style';
import { db } from '../../Firebase';
import { auth } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../assets/images/Caticon1.png'

// import { Link } from 'react-router-dom';

export type Post = {
  id: string;
  content: string;
  title: string;
  imageUrl: string;
  createdAt: any;
};

const MyPagePost = () => {
  const currentUserInfos = auth.currentUser; // 현재 로그인한 사용자의 정보들(파이어베이스)
  const [posts, setPosts] = useState<Post[]>([]);
  const [isall, setIsall] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = collection(db, 'posts');
        const querySnapshot = await getDocs(q);
        const postData: Post[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.email === currentUserInfos?.email) {
            postData.push({
              id: doc.id,
              content: data.content,
              title: data.title,
              imageUrl: data.imageUrl,
              createdAt: data.any,
            });
          }
        });
        setPosts(postData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUserInfos]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const viewAllHandler = () => {
    isall === false ? setIsall(true) : setIsall(false);
  };

  const navcommunity = () => {
    navigate('/community');
  };

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  return (
    <S.AllPostContainer>
      <S.TitleContainer>등록게시글</S.TitleContainer>
      {posts.length > 0 ? (
        <>
          <S.ReviewContainer>
            {posts.length < 5
              ? posts.map(post => (
                  <S.PostContainer key={post.id}>
                    <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg}/>
                    <S.TextContainer>
                      <S.TextTitle> {post.title}</S.TextTitle>
                      <S.TextIndex> {post.content}</S.TextIndex>
                    </S.TextContainer>
                  </S.PostContainer>
                ))
              : isall === true
              ? posts.map(post => (
                  <S.PostContainer key={post.id}>
                    <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg}/>
                    <S.TextContainer>
                      <S.TextTitle> {post.title}</S.TextTitle>
                      <S.TextIndex> {post.content}</S.TextIndex>
                    </S.TextContainer>
                  </S.PostContainer>
                ))
              : posts.map((post, i) =>
                  i < 4 ? (
                    <S.PostContainer key={post.id}>
                      <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg}/>
                      <S.TextContainer>
                        <S.TextTitle> {post.title}</S.TextTitle>
                        <S.TextIndex> {post.content}</S.TextIndex>
                      </S.TextContainer>
                    </S.PostContainer>
                  ) : (
                    <></>
                  )
                )}
          </S.ReviewContainer>
          <>
            {isall === false ? (
              <S.PostContainerBtn onClick={viewAllHandler}>펼치기</S.PostContainerBtn>
            ) : (
              <S.PostContainerBtn onClick={viewAllHandler}>접기</S.PostContainerBtn>
            )}
          </>
        </>
      ) : (
        <S.NoPostsContainer>
          <h2>등록된 게시글이 없습니다</h2>         
         <S.NoPostsBtn onClick={navcommunity}>게시글 등록하기</S.NoPostsBtn>
         </S.NoPostsContainer>

      )}
    </S.AllPostContainer>
  );
};
export default MyPagePost;

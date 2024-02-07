import { SyntheticEvent, useEffect, useState } from 'react';
import * as S from './MyPagePoststyle';

import { db } from '../../../Firebase';
import { auth } from '../../../Firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import defaultImg from '../../../assets/images/Caticon1.png';
import NoPosts from '../NoPosts';

export type Post = {
  id: string;
  content: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
};

const MyPagePost = () => {
  const currentUserInfos = auth.currentUser; // 현재 로그인한 사용자의 정보들(파이어베이스)
  const [posts, setPosts] = useState<Post[]>([]);
  const [isall, setIsall] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
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
              createdAt: data.createdAt.toDate(),
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
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <S.PostContainer key={post.id}>
                      <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg} />
                      <S.TextContainer>
                        <S.TextTitle> {post.title}</S.TextTitle>
                        <S.TextIndex> {post.content}</S.TextIndex>
                      </S.TextContainer>
                    </S.PostContainer>
                  </Link>
                ))
              : isall === true
              ? posts.map(post => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <S.PostContainer key={post.id}>
                      <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg} />
                      <S.TextContainer>
                        <S.TextTitle> {post.title}</S.TextTitle>
                        <S.TextIndex> {post.content}</S.TextIndex>
                      </S.TextContainer>
                    </S.PostContainer>
                  </Link>
                ))
              : posts.map((post, i) =>
                  i < 4 ? (
                    <Link key={post.id} to={`/posts/${post.id}`}>
                      <S.PostContainer key={post.id}>
                        <S.PostImgContainer src={post.imageUrl} onError={addDefaultImg} />
                        <S.TextContainer>
                          <S.TextTitle> {post.title}</S.TextTitle>
                          <S.TextIndex> {post.content}</S.TextIndex>
                        </S.TextContainer>
                      </S.PostContainer>
                    </Link>
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
          <NoPosts />
        </S.NoPostsContainer>
      )}
    </S.AllPostContainer>
  );
};
export default MyPagePost;

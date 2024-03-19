import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase';
import { collection, query, onSnapshot, DocumentData, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const TitleHeader = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
  padding-top: 20px;
  margin-bottom: 20px;
  margin-right: 70%;
  font-family: GmarketSansMedium;
`;

const BoardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin-left: 8%;
  position: relative;
  border: 2px solid #ebebdd;
  border-radius: 10px;
  font-family: 'GmarketSansMedium';
`;

const PostContainer = styled.div`
  width: calc(100% - 120px);
  background-color: #e6e6d5;
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; // This is important for absolutely positioned children
  left: 90px;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`;

const PostTitle = styled.h3`
  margin: 0;
  flex-grow: 1;
`;

const CircleImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 1px solid #000;
  position: absolute;
  left: -85px;
  top: 50%;
  transform: translateY(-50%);
`;

const WriteButton = styled.button`
  padding: 10px 15px;
  background-color: #e6e6d5;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: -10%;
  top: 1%;
  z-index: 1000;
  font-family: 'GmarketSansMedium';
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #e6e6d5;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  font-family: 'GmarketSansMedium';
`;

const defaultImage = process.env.PUBLIC_URL + 'no image.png';

interface Post {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl?: string;
  views: number;
}

const DailyBoard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  console.log('DailyBoard');
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribePosts = onSnapshot(q, querySnapshot => {
      const postsArray: Post[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as DocumentData;
        postsArray.push({
          id: doc.id,
          title: data.title,
          createdAt: data.createdAt.toDate(),
          imageUrl: data.imageUrl,
          views: data.views || 0,
        });
      });
      setPosts(postsArray);
      setVisiblePosts(postsArray.slice(0, 10));
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  const handleMoreClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleWriteButtonClick = () => {
    if (user) {
      navigate('/write-post');
    } else {
      alert('게시글을 작성하려면 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/signin');
    }
  };

  const handleLoadMore = () => {
    setVisiblePosts(posts);
  };

  return (
    <>
      <TitleHeader>일상 게시글</TitleHeader>
      <BoardContainer>
        <WriteButton onClick={handleWriteButtonClick}>게시글 작성</WriteButton>
        {visiblePosts.map(post => (
          <PostContainer key={post.id} onClick={() => handleMoreClick(post.id)}>
            <CircleImage src={post.imageUrl || defaultImage} alt="게시물 이미지" />
            <PostTitle>{post.title}</PostTitle>
            <img
              className="cat-feet"
              src={process.env.PUBLIC_URL + '/cat-feet.png'}
              alt="고양이 발바닥 이미지"
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '25px',
                height: 'auto',
              }}
            />
          </PostContainer>
        ))}
        {posts.length > 10 && <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>}
      </BoardContainer>
    </>
  );
};

export default DailyBoard;

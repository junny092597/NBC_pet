import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase';
import { collection, query, onSnapshot, DocumentData, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const BoardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin-left: 10%;
  position: relative;
  border: 1px solid red;
`;

const PostContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
  border: 1px solid blue;
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
  left: -100px;
  top: 50%;
  transform: translateY(-50%);
`;

const WriteButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: -10%;
  top: 1%;
  z-index: 1000;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px auto; // 중앙 정렬을 위한 스타일
  display: block; // 블록 레벨 요소로 만들어주어야 함
`;

interface Post {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl?: string;
}

const DailyBoard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
      navigate('/signin'); // Redirect to login page
    }
  };

  const handleLoadMore = () => {
    setVisiblePosts(posts); // 모든 게시글을 표시
  };

  return (
    <BoardContainer>
      <WriteButton onClick={handleWriteButtonClick}>게시글 작성</WriteButton>
      {visiblePosts.map(post => (
        <PostContainer key={post.id} onClick={() => handleMoreClick(post.id)}>
          {post.imageUrl && <CircleImage src={post.imageUrl} alt="Post image" />}
          <PostTitle>{post.title}</PostTitle>
        </PostContainer>
      ))}
      {posts.length > 10 && <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>}
    </BoardContainer>
  );
};

export default DailyBoard;

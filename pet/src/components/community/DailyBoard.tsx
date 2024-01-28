import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const BoardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin-left: 10%;
  position: relative;
`;

const PostContainer = styled.div`
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
  position: relative;
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
  bottom: 30px;
  z-index: 1000;
`;

interface Post {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl?: string;
}

const DailyBoard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state changed listener
    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'posts'));
    const unsubscribePosts = onSnapshot(q, querySnapshot => {
      const postsArray = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        return {
          id: doc.id,
          title: data.title,
          createdAt,
          imageUrl: data.imageUrl,
        } as Post;
      });
      setPosts(postsArray);
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

  return (
    <BoardContainer>
      <WriteButton onClick={handleWriteButtonClick}>게시글 작성</WriteButton>
      {posts.map(post => (
        <PostContainer key={post.id} onClick={() => handleMoreClick(post.id)}>
          {post.imageUrl && <CircleImage src={post.imageUrl} alt="Post image" />}
          <PostTitle>{post.title}</PostTitle>
        </PostContainer>
      ))}
    </BoardContainer>
  );
};

export default DailyBoard;

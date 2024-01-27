import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

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

const DailyBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const postsArray: Post[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        postsArray.push({
          id: doc.id,
          title: data.title,
          createdAt: data.createdAt.toDate(),
          imageUrl: data.imageUrl,
        });
      });

      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

  const handleMoreClick = (postId: string) => {
    console.log(`More button clicked for post ${postId}`);
  };

  const handleWriteButtonClick = () => {
    navigate('/write-post');
  };

  return (
    <BoardContainer>
      <WriteButton onClick={handleWriteButtonClick}>게시글 작성</WriteButton>
      {posts.map(post => (
        <PostContainer key={post.id} onClick={() => handleMoreClick(post.id)}>
          <CircleImage src={post.imageUrl} alt="Post image" />
          <PostTitle>{post.title}</PostTitle>
        </PostContainer>
      ))}
    </BoardContainer>
  );
};

export default DailyBoard;

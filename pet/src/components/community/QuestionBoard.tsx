import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase'; // Include auth for authentication check
import { collection, query, onSnapshot, DocumentData, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import necessary Firebase modules

const BoardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin-left: 8%;
  position: relative;
  border: 2px solid #ebebdd; // 테두리 색상 설정
  border-radius: 10px; // 모서리 둥글게 설정
`;

const PostContainer = styled.div`
  width: calc(100% - 100px);
  background-color: #e6e6d5;
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: -12%;
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

const defaultImage = process.env.PUBLIC_URL + 'no image.jpg';

interface QuestionPost {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl?: string;
}

const QuestionBoard: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [VisibleQuestions, setVisibleQuestions] = useState<QuestionPost[]>([]);
  const [user, setUser] = useState<User | null>(null); // State to hold the current user
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // Update user state on auth state change
    });

    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribeQuestions = onSnapshot(q, querySnapshot => {
      const questionsArray: QuestionPost[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as DocumentData;
        questionsArray.push({
          id: doc.id,
          title: data.title,
          createdAt: data.createdAt.toDate(),
          imageUrl: data.imageUrl,
        });
      });
      setQuestions(questionsArray);
      setVisibleQuestions(questionsArray.slice(0, 10));
    });

    // Cleanup function
    return () => {
      unsubscribeAuth();
      unsubscribeQuestions();
    };
  }, []);

  const handleMoreClick = (postId: string) => {
    navigate(`/questions/${postId}`);
  };

  const handleWriteButtonClick = () => {
    if (user) {
      navigate('/write-question');
    } else {
      alert('질문 게시글을 작성하려면 로그인이 필요합니다. 회원가입을 해주세요.');
      navigate('/signin');
    }
  };

  const handleLoadMore = () => {
    setVisibleQuestions(questions);
  };

  return (
    <BoardContainer>
      <WriteButton onClick={handleWriteButtonClick}>질문 게시글 작성</WriteButton>
      {VisibleQuestions.map(post => (
        <PostContainer key={post.id} onClick={() => handleMoreClick(post.id)}>
          <CircleImage src={post.imageUrl || defaultImage} alt="게시물 이미지" />
          <PostTitle>{post.title}</PostTitle>
        </PostContainer>
      ))}
      {questions.length > 10 && <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>}
    </BoardContainer>
  );
};

export default QuestionBoard;

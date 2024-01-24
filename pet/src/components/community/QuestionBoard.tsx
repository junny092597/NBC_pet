// components/community/DailyBoard.tsx
import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin-left: 10%;
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
  &:hover {background-color: #eaeaea;}
  position: relative; // 상대적 포지셔닝 기준 설정
`;

const PostTitle = styled.h3`
  margin: 0;
  flex-grow: 1; // 제목이 컨테이너의 남은 공간을 차지하도록 합니다.
`;

const questions = [
  { id: 1, title: '질문 게시글 제목' },
  { id: 2, title: '질문 게시글 제목' },
  // 더 많은 게시글...
];

const CircleImage = styled.img`
  width: 70px; // 이미지 크기 설정
  height: 70px; // 이미지 크기 설정
  border-radius: 50%; // 원 모양으로 만들기
  object-fit: cover; // 이미지 비율 유지
  margin-right: 15px; // 제목과의 간격 설정
  border: 1px solid #000; // 이미지가 없을 때 경계를 보여주기 위한 테두리 (필요하다면 제거하세요)
  position: absolute; // 절대 위치를 사용하여 컨테이너 내에서 위치 설정
  left: -100px; // PostContainer의 왼쪽 바깥으로 60px 만큼 이동
  top: 50%; // 상단에서 50%의 위치에 배치
  transform: translateY(-50%); // Y축으로 -50% 만큼 이동하여 중앙 정렬
`;

const QuestionBoard = () => {
  // '더보기' 버튼에 대한 클릭 이벤트 핸들러입니다.
  const handleMoreClick = (postId: number) => {
    // 여기에 '더보기' 기능을 구현하거나, 상세 페이지로 라우팅하는 로직을 추가합니다.
    console.log(`More button clicked for post ${postId}`);
  };

  return (
    <BoardContainer>
      {questions.map(question => (
        <PostContainer key={question.id} onClick={() => handleMoreClick(question.id)}>
          <CircleImage src="/path/to/your/image.jpg" alt="Profile" />
          <PostTitle>{question.title}</PostTitle>
        </PostContainer>
      ))}
    </BoardContainer>
  );
};

export default QuestionBoard;

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 50px;
  margin: 0 0 30px 30px;
  width: 80%;
  font-family: 'GmarketSansMedium';
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
  resize: vertical; // 사용자가 수직으로 크기 조절을 할 수 있게 함
  font-family: 'GmarketSansMedium';
  height: 50px; // 초기 높이 설정
  overflow-y: auto; // 내용이 많아지면 스크롤바가 생기도록 설정
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #f6f7c4;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #d9f8e5;
  }
  font-family: 'GmarketSansMedium';
`;

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState<string>('');
  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        content: comment,
        createdAt: serverTimestamp(),
        authorId: user?.uid,
      });
      setComment('');
      onCommentAdded(); // 댓글 추가 후 부모 컴포넌트의 함수 호출
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea placeholder="댓글을 입력하세요" value={comment} onChange={e => setComment(e.target.value)} required />
      <Button type="submit">댓글 달기</Button>
    </Form>
  );
};

export default CommentForm;

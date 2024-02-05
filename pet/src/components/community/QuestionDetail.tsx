import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import styled from 'styled-components';

const DetailContainer = styled.div`
  background: #fff8f0; // 밝은 살구색 배경
  padding: 2rem; // 패딩을 rem 단위로 변경
  margin: 2rem auto; // 마진을 rem 단위로 변경
  max-width: 800px;
  border-radius: 10px; // 둥근 모서리
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 부드러운 그림자 효과
  border: 1px solid #f0e6d6; // 테두리 색상 변경
`;

const Title = styled.h1`
  font-size: 2.5rem; // 크기 증가
  margin-bottom: 1.5rem; // 마진 변경
  color: #ff4500; // 타이틀 색상 변경
  text-align: center; // 중앙 정렬
`;

const Content = styled.p`
  font-size: 1.125rem; // 콘텐츠 폰트 크기 변경
  line-height: 1.6; // 줄 간격
  color: #555; // 글자 색상 변경
  margin-bottom: 1.5rem; // 마진 변경
  text-align: justify; // 정렬 변경
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 1.5rem;
  border-radius: 5px; // 이미지 둥근 모서리
`;

const ButtonContainer = styled.div``;

const EditButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 질문 데이터 인터페이스
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
  authorId?: string;
}

const QuestionDetail: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    const fetchQuestion = async () => {
      setLoading(true);
      try {
        if (questionId) {
          const questionRef = doc(db, 'questions', questionId);
          const docSnap = await getDoc(questionRef);

          if (docSnap.exists()) {
            const questionData = docSnap.data() as Post;
            setQuestion({
              id: docSnap.id,
              title: questionData.title,
              content: questionData.content,
              createdAt: questionData.createdAt,
              imageUrl: questionData.imageUrl,
              authorId: questionData.authorId,
            });
          } else {
            setError('Document does not exist');
          }
        }
      } catch (err) {
        setError('Failed to fetch question');
      }
      setLoading(false);
    };

    fetchQuestion();
    return () => unsubscribe();
  }, [questionId]);

  const isAuthor = currentUser && question && question.authorId === currentUser.uid;

  const handleEdit = () => {
    if (isAuthor) {
      navigate(`/edit/${questionId}`);
    }
  };
  if (!questionId) {
    // postId가 undefined인 경우의 처리
    console.error('No postId provided');
    return;
  }

  const handleDelete = async () => {
    if (!isAuthor) {
      alert('자신의 게시글만 삭제할 수 있습니다.');
      return;
    }

    // 사용자에게 확인
    if (window.confirm('이 게시글을 정말 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        // 문서를 삭제
        await deleteDoc(doc(db, 'question', questionId));
        // 사용자를 홈페이지로 리다이렉션
        navigate('/');
      } catch (error) {
        console.error('문서 삭제 오류: ', error);
        setError('게시글을 삭제하지 못했습니다.');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!question) {
    return <div>No question found</div>;
  }

  return (
    <DetailContainer>
      <Title>{question.title}</Title>
      <Content>{question.content}</Content>
      {question.imageUrl && <Image src={question.imageUrl} alt="Post image" />}
      {isAuthor && (
        <ButtonContainer>
          <EditButton onClick={handleEdit}>수정</EditButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </ButtonContainer>
      )}
    </DetailContainer>
  );
};

export default QuestionDetail;

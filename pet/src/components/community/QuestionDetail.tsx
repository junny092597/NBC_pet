import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
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

// 질문 데이터 인터페이스
interface Question {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
}

const QuestionDetail: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        if (questionId) {
          const questionRef = doc(db, 'questions', questionId);
          const docSnap: DocumentSnapshot = await getDoc(questionRef);

          if (docSnap.exists()) {
            const questionData = docSnap.data();
            setQuestion({
              id: docSnap.id,
              title: questionData.title,
              content: questionData.content,
              createdAt: questionData.createdAt.toDate(), // Firestore 타임스탬프를 JavaScript Date 객체로 변환
              imageUrl: questionData.imageUrl,
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
  }, [questionId]);

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
      {question.imageUrl && <Image src={question.imageUrl} alt="Question image" />}
    </DetailContainer>
  );
};

export default QuestionDetail;

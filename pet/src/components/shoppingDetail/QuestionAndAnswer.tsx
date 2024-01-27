import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';

interface Qna {
  id: string;
  email: string;
  itemName?: string | undefined;
  index: string;
}

interface QnAProps {
  data: {
    userEmail: string;
    itemName?: string | undefined;
  };
}

function QnA({ data }: QnAProps): JSX.Element {
  // 리뷰 내용 상태
  const [index, setIndex] = useState<string>('');
  //리뷰목록 상태
  const [QnAs, setQnA] = useState<Qna[]>([]);

  useEffect(() => {
    // 데이터 상태 업데이트
    const fetchQnAs = async () => {
      if (data.itemName) {
        const q = query(collection(db, 'QnA'), where('itemName', '==', data.itemName));
        const querySnapshot = await getDocs(q);
        const QnAData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Qna));
        setQnA(QnAData);
      }
    };

    fetchQnAs();
  }, [data.itemName]);

  const handleWriteQnA = async () => {
    if (index.trim() === '') {
      alert('게시글을 작성해주세요.');
      return;
    }

    try {
      const QnARef = await addDoc(collection(db, 'QnA'), {
        email: data.userEmail,
        itemName: data.itemName,
        index: index,
      });

      setQnA(prevQnAs => [
        ...prevQnAs,
        { id: QnARef.id, email: data.userEmail, itemName: data.itemName, index: index },
      ]);
      setIndex('');
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생: ', error);
    }
  };

  const handleDeleteQnA = async (QnAId: string) => {
    try {
      await deleteDoc(doc(db, 'QnA', QnAId));

      setQnA(prevQnAs => prevQnAs.filter(QnA => QnA.id !== QnAId));
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생: ', error);
    }
  };

  return (
    <>
      <SHeadTitle>
        <h2>Q&A</h2>
      </SHeadTitle>
      <div>
        <STextArea placeholder="게시글을 작성해주세요" onChange={e => setIndex(e.target.value)} value={index} />
        <SButton onClick={handleWriteQnA}>작성하기</SButton>
      </div>
      {QnAs.map(QnA => (
        <div key={QnA.id}>
          <SEmailBox>{QnA.email}</SEmailBox>
          <SIndexContainer>
            <SIndexBox>{QnA.index}</SIndexBox>
            <SButton onClick={() => handleDeleteQnA(QnA.id)}>삭제하기</SButton>
          </SIndexContainer>
        </div>
      ))}
    </>
  );
}

export default QnA;

const SHeadTitle = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
`;
const STextArea = styled.textarea`
  width: 20vw;
  height: 6vh;
  resize: none;
`;

const SButton = styled.button`
  width: 5vw;
  height: 3vh;
  background-color: white;
  border: none;
  font-size: 13px;
  transition: background-color 0.3s; /* 변화를 부드럽게 만들기 위한 트랜지션 속성 추가 */

  &:hover {
    font-weight: bold;
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`;

const SIndexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 25vw;
  margin-bottom: 1rem;
  border-bottom: 1px solid gray;
`;
const SIndexBox = styled.span`
  width: 20vw;
  word-wrap: break-word;
`;

const SEmailBox = styled.div`
  font-size: 12px;
  color: gray;
`;

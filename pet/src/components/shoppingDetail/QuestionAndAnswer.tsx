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
      <h2>Q&A</h2>
      <STextArea placeholder="게시글을 작성해주세요" onChange={e => setIndex(e.target.value)} value={index} />
      <button onClick={handleWriteQnA}>작성하기</button>

      {QnAs.map(QnA => (
        <div key={QnA.id}>
          <p>{QnA.index}</p>
          <button onClick={() => handleDeleteQnA(QnA.id)}>삭제하기</button>
        </div>
      ))}
    </>
  );
}

export default QnA;

const STextArea = styled.textarea`
  resize: none;
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { storage } from '../../Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const WriteQuestionPost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      if (file) {
        const fileRef = ref(storage, `questions/${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'questions'), {
        title: title,
        content: content,
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      navigate('/questions'); // 질문 게시판 목록으로 리디렉션
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="질문의 제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea placeholder="질문의 내용을 입력하세요" value={content} onChange={e => setContent(e.target.value)} />
        <Input type="file" onChange={handleFileChange} />
        <SubmitButton type="submit">질문 게시글 제출</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default WriteQuestionPost;

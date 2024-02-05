import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../../Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  width: 80%;
  margin: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ContentContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const Textarea = styled.textarea`
  width: calc(100% - 20px);
  height: 150px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  resize: none;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #f8f8f8;
`;

const WritePost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      if (file) {
        const fileRef = ref(storage, `posts/${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const userEmail = auth.currentUser?.email || '익명';
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        imageUrl,
        createdAt: new Date(),
        email: userEmail,
        authorId: auth.currentUser?.uid,
      });

      navigate('/daily');
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

  const handleFileClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
        <ContentContainer>
          <Textarea placeholder="내용을 입력하세요" value={content} onChange={e => setContent(e.target.value)} />
          <Toolbar>
            <AiOutlineCloudUpload size="24px" onClick={handleFileClick} />
            <FileInput id="fileInput" type="file" onChange={handleFileChange} />
          </Toolbar>
        </ContentContainer>
        <SubmitButton type="submit">게시글 제출</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default WritePost;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
  authorId?: string;
}

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  useEffect(() => {
    if (!postId) return; // postId가 없으면 early return

    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          const postData = docSnap.data() as Post;
          setTitle(postData.title);
          setContent(postData.content);
          setExistingImageUrl(postData.imageUrl || '');
        } else {
          console.error('No such document!');
          navigate('/'); // 문서가 없으면 홈으로 리다이렉트
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = existingImageUrl;

    if (file) {
      const fileRef = ref(storage, `posts/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      const postRef = doc(db, 'posts', `${postId}`);
      await updateDoc(postRef, {
        title,
        content,
        imageUrl,
        updatedAt: new Date(),
      });

      navigate(`/posts/${postId}`); // 수정 후 상세 페이지로 리다이렉트
    } catch (error) {
      console.error('Error updating document:', error);
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
export default EditPost;

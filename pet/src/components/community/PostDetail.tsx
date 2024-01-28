import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

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

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const AuthorInfo = styled.div`
  margin-top: 1rem;
  font-style: italic;
  color: #777;
`;

// 게시물 데이터 인터페이스
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
  authorId?: string;
  authorEmail?: string; // 작성자 이메일 추가
  authorName?: string; // 작성자 닉네임 추가
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [user] = useAuthState(auth); // 현재 사용자를 가져오기 위해 useAuthState 사용

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (postId) {
          const postRef = doc(db, 'posts', postId);
          const docSnap: DocumentSnapshot = await getDoc(postRef);

          if (docSnap.exists()) {
            const postData = docSnap.data();
            const authorRef = doc(db, 'users', postData.authorId);
            const authorSnap: DocumentSnapshot = await getDoc(authorRef);

            let authorEmail = '';
            let authorName = '';

            if (authorSnap.exists()) {
              const authorData = authorSnap.data();
              authorEmail = authorData.email;
              authorName = authorData.displayName;
            }

            setPost({
              id: docSnap.id,
              title: postData.title,
              content: postData.content,
              createdAt: postData.createdAt.toDate(),
              imageUrl: postData.imageUrl,
              authorId: postData.authorId,
              authorEmail: authorEmail,
              authorName: authorName,
            });
          } else {
            setError('Document does not exist');
          }
        }
      } catch (err) {
        setError('Failed to fetch post');
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else if (!post) {
    return <div>No post found</div>;
  } else {
    // 로그인한 사용자가 글의 작성자인지 확인
    const isAuthor = user && user.uid === post.authorId;

    return (
      <DetailContainer>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        {post.imageUrl && <Image src={post.imageUrl} alt="Post image" />}
        <AuthorInfo>
          작성자: {post.authorName} ({post.authorEmail})
        </AuthorInfo>
        {isAuthor && <EditButton onClick={handleEdit}>글 수정</EditButton>}
      </DetailContainer>
    );
  }
};

export default PostDetail;

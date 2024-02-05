import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../Firebase';
import { doc, getDoc, deleteDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import styled from 'styled-components';
import CommentsList from '../community/CommentsList';
import defaultProfilePic from '../../../src/assets/images/logo3.png';

function linkify(inputText: string): string {
  const linkRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return inputText.replace(linkRegex, (url: string) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}
const DetailContainer = styled.div`
  max-width: 80%;
  margin: 2rem auto;
  border-bottom: 2px solid black;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  padding: 30px;
  border-bottom: 1px solid black;
`;

const Title = styled.h1`
  font-family: 'GmarketSansMedium'; // Set the custom font
  color: #000; // Set text color to black
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 30px;
`;

const UserNameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 30px;
`;

const Username = styled.span`
  font-family: 'GmarketSansMedium'; // Set the custom font
  color: #000; // Set text color to black
  font-size: 1rem;
  font-weight: bold;
`;

const PostDate = styled.span`
  font-family: 'GmarketSansMedium'; // Set the custom font
  color: #000; // Set text color to black
  font-size: 0.875rem;
`;

const ViewsCount = styled.span`
  font-family: 'GmarketSansMedium'; // Set the custom font
  color: #000; // Set text color to black
  font-size: 0.875rem;
  margin-left: auto;
  padding-left: 20px;
`;

const Content = styled.div`
  font-family: 'GmarketSansMedium'; // Set the custom font
  color: #000; // Set text color to black
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: justify;
  white-space: pre-wrap;
  margin-top: 50px;
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 1.5rem;
  border-radius: 5px;
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

interface Author {
  id: string;
  name: string;
  profilePic: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
  authorId?: string;
  author: Author;
  views: number;
  commentsCount: number;
}
const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = defaultProfilePic;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    const fetchPost = async () => {
      setLoading(true);
      try {
        if (postId) {
          const postRef = doc(db, 'posts', postId);
          const docSnap = await getDoc(postRef);

          if (docSnap.exists()) {
            const postData = docSnap.data() as Post;
            const createdAtDate =
              postData.createdAt instanceof Timestamp ? postData.createdAt.toDate() : postData.createdAt;
            const authorData = postData.author || { id: '', name: '익명', profilePic: '' };
            const viewsCount = postData.views || 0;
            const commentsCount = postData.commentsCount || 0;
            const newViewsCount = viewsCount + 1;
            await updateDoc(postRef, { views: newViewsCount });

            setPost({
              id: docSnap.id,
              title: postData.title,
              content: postData.content,
              createdAt: createdAtDate,
              imageUrl: postData.imageUrl,
              authorId: postData.authorId,
              author: authorData,
              views: viewsCount,
              commentsCount: commentsCount,
            });
          } else {
            setError('문서가 존재하지 않습니다');
          }
        }
      } catch (err) {
        setError('게시물을 가져오지 못했습니다.');
      }
      setLoading(false);
    };

    fetchPost();

    return () => unsubscribe();
  }, [postId]);

  const isAuthor = currentUser && post && post.authorId === currentUser.uid;
  console.log(isAuthor);
  console.log(currentUser);
  console.log(post);

  const handleEdit = () => {
    if (isAuthor) {
      navigate(`/edit/${postId}`);
    }
  };
  if (!postId) {
    console.error('제공된 게시물 ID가 없습니다.');
    return;
  }

  const handleDelete = async () => {
    if (!isAuthor) {
      alert('자신의 게시글만 삭제할 수 있습니다.');
      return;
    }

    if (window.confirm('이 게시글을 정말 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'posts', postId));
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
  } else if (error) {
    return <div>Error: {error}</div>;
  } else if (!post) {
    return <div>No post found</div>;
  }
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!post && !loading && <div>No post found</div>}
      {post && (
        <DetailContainer>
          <Header>
            <Title>{post.title}</Title>
            <UserInfo>
              <ProfilePic
                src={post.author.profilePic || defaultProfilePic}
                alt="Profile image"
                onError={handleImageError}
              />
              <UserNameAndDate>
                <Username>{post.author.name}</Username>
                <PostDate>
                  {post.createdAt.toLocaleDateString()} {post.createdAt.toLocaleTimeString()}
                </PostDate>
              </UserNameAndDate>
              <ViewsCount>조회수 {post.views}</ViewsCount>
            </UserInfo>
          </Header>
          {post.imageUrl && <Image src={post.imageUrl} alt="Post image" />}
          {isAuthor && (
            <ButtonContainer>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonContainer>
          )}
          <Content dangerouslySetInnerHTML={{ __html: linkify(post.content) }} />
        </DetailContainer>
      )}
      {postId && <CommentsList postId={postId} />}
    </>
  );
};
export default PostDetail;

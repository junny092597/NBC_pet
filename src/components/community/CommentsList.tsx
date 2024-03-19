import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { db } from '../../Firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import CommentForm from '../community/CommentForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 150px;
  width: 100%; // This ensures that the container takes the full width
`;

const CommentBubble = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 30px;
  width: 80%;
  display: flex; // flex 속성 추가
  justify-content: space-between; // 내용을 양쪽 끝으로 정렬
  align-items: center; // 수직 정렬
  font-family: 'GmarketSansMedium';
`;
const CommentTextContainer = styled.div`
  flex-grow: 1; // 댓글 내용이 차지할 수 있는 최대 공간을 차지하도록 설정
`;

const CommentContent = styled.p`
  margin: 0;
  white-space: pre-wrap; /* 공백과 줄바꿈을 유지하면서 텍스트를 표시합니다. */
  word-break: break-word; /* 단어가 너무 길면 자동으로 줄바꿈합니다. */
`;

const CommentDetails = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝으로 정렬 */
  align-items: center;
  margin-top: 5px;
`;

const CommentDate = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

interface Comment {
  id: string;
  content: string;
  authorId?: string;
  authorName?: string;
  authorProfilePic?: string;
  createdAt?: any;
  subComments?: Comment[];
}

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchAuthorDetails = async (authorId: string): Promise<{ name: string; profilePic: string }> => {
    const userRef = doc(db, 'users', authorId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return { name: userDoc.data().name, profilePic: userDoc.data().profilePic };
    } else {
      return { name: 'Anonymous', profilePic: 'defaultProfilePicUrl' };
    }
  };

  const fetchCommentsAndSubComments = useCallback(async () => {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(commentsQuery);
    const fetchedComments: Comment[] = [];
    for (const doc of querySnapshot.docs) {
      const commentData = doc.data() as Omit<Comment, 'id'>;
      const authorDetails = await fetchAuthorDetails(commentData.authorId ?? '');
      fetchedComments.push({
        id: doc.id,
        ...commentData,
        authorName: authorDetails.name,
        authorProfilePic: authorDetails.profilePic,
        subComments: [],
      });
    }
    setComments(fetchedComments);
  }, [postId]);

  useEffect(() => {
    fetchCommentsAndSubComments();
  }, [fetchCommentsAndSubComments]);

  return (
    <Container>
      <CommentForm postId={postId} onCommentAdded={fetchCommentsAndSubComments} />
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentBubble key={comment.id}>
            <CommentTextContainer>
              <CommentContent>{comment.content}</CommentContent>
            </CommentTextContainer>
            <CommentDetails>
              <CommentDate>{comment.createdAt?.toDate().toLocaleString()}</CommentDate>
            </CommentDetails>
            {comment.subComments &&
              comment.subComments.map(subComment => (
                <CommentBubble key={subComment.id}>
                  <CommentDetails>
                    <CommentDate>{subComment.createdAt?.toDate().toLocaleString()}</CommentDate>
                  </CommentDetails>
                </CommentBubble>
              ))}
          </CommentBubble>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </Container>
  );
};
export default CommentsList;

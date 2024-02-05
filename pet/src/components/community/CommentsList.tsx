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
  padding: 10px 15px;
  margin-bottom: 30px;
  width: 80%;
`;

const CommentContent = styled.p`
  margin: 0;
`;

const CommentDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 10px;
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

// Component
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

  // Fetch all comments and their sub-comments
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
        subComments: [], // 이 부분은 기존 로직을 그대로 사용
      });
    }
    setComments(fetchedComments);
  }, [postId]);

  useEffect(() => {
    fetchCommentsAndSubComments();
  }, [fetchCommentsAndSubComments]);

  // Add a new sub-comment to the database

  // Render
  return (
    <Container>
      <CommentForm postId={postId} onCommentAdded={fetchCommentsAndSubComments} />
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentBubble key={comment.id}>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDetails>
              <CommentDate>{comment.createdAt?.toDate().toLocaleString()}</CommentDate>
            </CommentDetails>
            {/* <ReplyForm onSubmit={e => handleReplySubmit(comment.id, e)}>
              <ReplyInput
                type="text"
                value={replies[comment.id] || ''}
                onChange={e => handleReplyChange(comment.id, e)}
                placeholder="구현중입니다."
              />
              <Button type="submit">댓글 달기</Button>
            </ReplyForm> */}
            {comment.subComments &&
              comment.subComments.map(subComment => (
                <CommentBubble key={subComment.id}>
                  <CommentContent>{subComment.content}</CommentContent>
                  <CommentDetails>
                    <CommentAuthor>{subComment.authorId}</CommentAuthor>
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

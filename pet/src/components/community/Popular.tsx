import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../../Firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 2rem; // 글자 크기를 2rem으로 증가
  font-weight: bold; // 글자 굵기를 bold로 설정
  color: #333;
  margin: 20px 0 0 30px; // 상단 마진 추가
`;
// Styled components
const ShortsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  padding: 70px 0;
  overflow-x: auto;
  width: 100%;
  border: 2px solid #ebebdd; // 테두리 색상 설정
  border-radius: 10px; // 모서리 둥글게 설정
  margin-top: 20px; // 제목과의 간격 설정
`;

const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 0 50px; // 양쪽 마진을 추가하여 간격을 넓힘
`;
const VideoThumbnailWrapper = styled.div`
  width: 170px; // 이미지 크기 + 테두리 두께 * 2
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #f6f7c4 0%, #a1eebd 100%);
  padding: 6px; // 테두리 두께
`;
const VideoThumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const VideoTitle = styled.h3`
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const PostContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`;

const CircleImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const PostTitle = styled.h3`
  margin: 0;
  flex-grow: 1;
`;

// TypeScript interfaces
interface Video {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
}

interface Post {
  id: string;
  title: string;
  createdAt: Date;
  imageUrl?: string;
  views: number;
}

// Component
const Popular: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&videoDefinition=high&q=${encodeURIComponent(
        '반려견과 함께하는 shorts'
      )}&key=${apiKey}`;

      try {
        const response = await axios.get(searchUrl);
        const fetchedVideos: Video[] = response.data.items.map((item: any) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
        }));
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching YouTube Shorts:', error);
        setError('사용량이 초과되어 YouTube Shorts를 불러오는 데 실패했습니다.');
      }
      setLoading(false); // 로딩 상태 업데이트
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      const postsQuery = query(collection(db, 'posts'), orderBy('views', 'desc'), limit(3));
      try {
        const querySnapshot = await getDocs(postsQuery);
        const postsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt.toDate(),
          imageUrl: doc.data().imageUrl,
          views: doc.data().views,
        }));
        setPosts(postsArray);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('게시글을 불러오는 데 실패했습니다.');
      }
      setLoading(false);
    };

    fetchPopularPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Title>인기 SHORTS</Title>
      <ShortsContainer>
        {videos.map(video => (
          <VideoCard
            key={video.videoId}
            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}>
            <VideoThumbnailWrapper>
              <VideoThumbnail src={video.thumbnailUrl} alt={video.title} />
            </VideoThumbnailWrapper>
            <VideoTitle>{video.title}</VideoTitle>
          </VideoCard>
        ))}
      </ShortsContainer>
      {/* <Title>인기 게시글</Title> */}
      <div>
        {posts.map(post => (
          <PostContainer key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
            {post.imageUrl && <CircleImage src={post.imageUrl} alt="Post image" />}
            <PostTitle>{post.title}</PostTitle>
          </PostContainer>
        ))}
      </div>
    </Container>
  );
};

export default Popular;

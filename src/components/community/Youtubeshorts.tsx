import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 210px;
  margin: 20px 20px;
`;

const ShortsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  padding: 20px;
  margin: 20px;
  border: 2px solid #ebebdd;
  border-radius: 10px;
`;

const RoundButton = styled.button`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease; /* Add transition to the transform property */

  &:hover {
    background-color: #f2f2f2;
    transform: scale(0.95); /* Add scaling transformation */
  }

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(140deg, #f6f7c4, #a1eebd);
    z-index: 1;
    transition: transform 0.3s ease; /* Ensure the pseudo-element also transitions smoothly */
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
  margin-top: 30px;
`;

const Title = styled.h3`
  width: 200px;
  font-weight: bold;
  margin: 0 0 5px 0;
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: GmarketSansMedium;
`;

const ChannelTitle = styled.p`
  width: 200px;
  font-weight: normal;
  margin: 0;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface YouTubeApiResponseItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
}

const fetchYouTubeShortsIds = async (keyword: string): Promise<YouTubeApiResponseItem[]> => {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&videoDefinition=high&q=${encodeURIComponent(
    keyword
  )} shorts&key=${apiKey}`;

  try {
    const response = await axios.get(searchUrl);
    console.log('API Response:', response.data);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube Shorts IDs:', error);
    return [];
  }
};

interface GenreButtonProps {
  label: string;
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelTitle: string;
}

const GenreButton: React.FC<GenreButtonProps> = ({ label, videoId, thumbnailUrl, title, channelTitle }) => {
  const handleClick = () => {
    window.open(`https://www.youtube.com/shorts/${videoId}`, '_blank');
  };
  return (
    <ButtonWrapper>
      <RoundButton onClick={handleClick} aria-label={`Watch ${title}`}>
        <div
          style={{
            position: 'relative',
            zIndex: 1, // 이 값은 ::before 요소보다 높아야 합니다.
            borderRadius: '50%',
            width: '95%',
            height: '90%',
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
          }}
        />
      </RoundButton>
      <TitleContainer>
        <Title>{title}</Title>
        <ChannelTitle>{channelTitle}</ChannelTitle>
      </TitleContainer>
    </ButtonWrapper>
  );
};

const YouTubeShorts: React.FC = () => {
  const [items, setItems] = useState<YouTubeApiResponseItem[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const keyword = '반려견과 함께하는';
    const cacheKey = `youtube-shorts-${keyword}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setItems(JSON.parse(cachedData));
    } else {
      fetchYouTubeShortsIds(keyword)
        .then(items => {
          localStorage.setItem(cacheKey, JSON.stringify(items));
          setItems(items);
        })
        .catch(e => {
          console.error('Error fetching YouTube Shorts IDs:', e);
          setError('사용량이 초과되어 YouTube Shorts를 불러오는 데 실패했습니다.');
        });
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container>
        <Title>YouTube Shorts</Title>
      </Container>
      <ShortsContainer>
        {items.map((item, index) => {
          const { videoId } = item.id;
          const { title, channelTitle, thumbnails } = item.snippet;
          const thumbnailUrl = thumbnails.high.url;

          return (
            <GenreButton
              key={videoId}
              label={`Video ${index + 1}`}
              videoId={videoId}
              thumbnailUrl={thumbnailUrl}
              title={title}
              channelTitle={channelTitle}
            />
          );
        })}
      </ShortsContainer>
    </>
  );
};

export default YouTubeShorts;

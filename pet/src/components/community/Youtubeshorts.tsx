import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
`;

const ShortsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 200px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const RoundButton = styled.button`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  box-shadow: 0 0 0 6px #dda0dd;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #f2f2f2;
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
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&videoDefinition=high&q=${encodeURIComponent(
    keyword
  )} shorts&key=${apiKey}`;

  try {
    const response = await axios.get(searchUrl);
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
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
            width: '100%',
            height: '100%',
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

  useEffect(() => {
    const keyword = '반려견과 함께하는';
    fetchYouTubeShortsIds(keyword).then(items => {
      setItems(items);
    });
  }, []);

  return (
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
  );
};

export default YouTubeShorts;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// Styled Components
const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #e1e1e1;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FileInput = styled.input`
  display: none;
`;

const ClipButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center; // 미리보기를 중앙에 배치
  padding: 10px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const PreviewVideo = styled.video`
  max-width: 100%;
  height: auto;
`;

const ChatInput = ({ onSendMessage }: { onSendMessage: (messageText: string, attachmentUrl: string | null) => void }) => {
  const [messageText, setMessageText] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() !== '' || attachmentUrl) {
      onSendMessage(messageText, attachmentUrl);
      setMessageText('');
      setAttachmentUrl(null);
      setPreviewUrl(null); // 미리보기 초기화
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClipButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MessageInputContainer>
          <MessageInput
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <ClipButton onClick={handleClipButtonClick} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </ClipButton>
          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </MessageInputContainer>
        <button type="submit" style={{ display: 'none' }}>Send</button>
      </form>
      {previewUrl && (
        <PreviewContainer>
          {previewUrl.endsWith('.mp4') ? (
            <PreviewVideo src={previewUrl} controls />
          ) : (
            <PreviewImage src={previewUrl} alt="File preview" />
          )}
        </PreviewContainer>
      )}
    </>
  );
};

export default ChatInput;

import React from 'react';
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

const MessageBox = styled.div`
  max-width: 500px;
  word-wrap: break-word;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ChatInput = ({ onSendMessage }: { onSendMessage: (messageText: string, attachmentUrl: string | null) => void }) => {
  const [messageText, setMessageText] = React.useState('');
  const [attachmentUrl, setAttachmentUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() !== '') {
      onSendMessage(messageText, attachmentUrl);
      setMessageText('');
      setAttachmentUrl(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // File change handling logic remains the same
  };

  const handleClipButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
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
      {attachmentUrl && (
        <MessageBox>
          <StyledImage src={attachmentUrl} alt="attachment" />
        </MessageBox>
      )}
    </form>
  );
};

export default ChatInput;
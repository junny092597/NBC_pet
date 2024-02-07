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

const ChatInput = ({ onSendMessage }: { onSendMessage: (messageText: string, attachmentUrl: string | null) => void }) => {
  const [messageText, setMessageText] = React.useState('');
  const [attachmentUrl, setAttachmentUrl] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(messageText, attachmentUrl);
    setMessageText('');
    setAttachmentUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachmentUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <label htmlFor="fileInput">
          <ClipButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </ClipButton>
        </label>
        <FileInput
          id="fileInput"
          type="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
        />
      </MessageInputContainer>
      <button type="submit" style={{ display: 'none' }}>Send</button>
    </form>
  );
};

export default ChatInput;

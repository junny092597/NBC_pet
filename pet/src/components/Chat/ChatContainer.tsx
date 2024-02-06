// ChatContainer.tsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import ChatInput from './ChatInput';

const socket = io('http://localhost:4000');

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 600px;
  margin: auto;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fafafa;
`;

const MessageList = styled.ul`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  list-style: none;
`;

const MessageItem = styled.div.attrs(() => ({}))<{ isMine: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
`;

const MessageContent = styled.div<{ isMine: boolean }>`
  max-width: 60%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isMine ? "#dcf8c6" : "#ffffff")};
  text-align: left;
`;

const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const SenderPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const SenderName = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

// ChatContainerComponent Component
const ChatContainerComponent: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (messageText: string) => {
    if (user) {
      socket.emit('chat message', {
        text: messageText,
        sender: user.uid,
        senderName: user.displayName || "Anonymous",
        senderPhotoURL: user.photoURL || "/default_profile.png",
      });
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index} isMine={message.sender === user?.uid}>
            {!message.isMine && (
              <SenderInfo>
                <SenderPhoto src={message.senderPhotoURL} alt="Sender" />
                <SenderName>{message.senderName}</SenderName>
              </SenderInfo>
            )}
            <MessageContent isMine={message.sender === user?.uid}>
              {message.text}
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
      <ChatInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatContainerComponent;

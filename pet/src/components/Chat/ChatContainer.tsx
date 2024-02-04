import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { Message } from './types';

// Socket.IO 서버 주소를 지정합니다. 실제 배포 시에는 해당 서버 주소를 사용합니다.
const socket = io('http://localhost:4000');

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chat message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (message: string) => {
    socket.emit('chat message', { text: message, sender: "User", id: Date.now().toString() });
  };

  return (
    <div>
      <ChatMessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;

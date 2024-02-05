import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Message } from '../../types/interface';

const socket = io('http://localhost:4000');

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    socket.on('chat message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (user) {
      socket.emit('chat message', { text: message, sender: user.displayName || "Anonymous", id: Date.now().toString() });
    }
  };

  if (!user) {
    return <div>채팅을 사용하기 위해 로그인을 해주세요!</div>;
  }

  return (
    <div>
      <ChatMessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;

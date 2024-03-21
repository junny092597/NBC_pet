import React from 'react';
import { Message } from '../../types/interface';
interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          <strong>{message.sender}:</strong> {message.text}
        </li>
      ))}
    </ul>
  );
};

export default ChatMessageList;

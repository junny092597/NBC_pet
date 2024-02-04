// ChatPage.tsx
import React from 'react';
import ChatContainer from '../components/Chat/ChatContainer'; // 경로는 실제 구조에 맞게 조정

const ChatPage: React.FC = () => {
  return (
    <div>
      <h1>Chat Room</h1>
      <ChatContainer />
      {/* 필요한 경우 여기에 추가적인 UI 요소나 기능을 포함할 수 있습니다. */}
    </div>
  );
};

export default ChatPage;

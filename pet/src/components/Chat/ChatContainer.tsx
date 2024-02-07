import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import ChatInput from './ChatInput'; // 경로는 적절하게 수정하세요
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom'; // 경로는 적절하게 수정하세요
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import basicProfileImg from '../../assets/images/logo.png'; // 기본 프로필 이미지 경로는 적절하게 수정하세요

const socket = io('https://nbc-pet-server-hyungjun.koyeb.app'); // 실제 서버 주소로 조정하세요

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

const MessageItem = styled.li<{ isMine: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  padding: 5px;
`;

const MessageContent = styled.div<{ isMine: boolean }>`
  max-width: 60%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isMine ? "#dcf8c6" : "#ffffff")};
`;

const SenderInfo = styled.div`
  margin-bottom: 5px;
`;

const SenderPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SenderName = styled.span`
  font-weight: bold;
`;

const ChatContainerComponent: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [userState, setUserState] = useRecoilState(userInfo);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserState({
          isLogin: true,
          userInfomation: {
            uid: firebaseUser.uid,
            nickName: firebaseUser.displayName || 'Anonymous',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || basicProfileImg,
          },
        });
      } else {
        setUserState(oldState => ({...oldState, isLogin: false}));
      }
    });

    socket.on('chat message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [setUserState]);

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index} isMine={message.sender === userState.userInfomation.uid}>
            <SenderInfo>
              <SenderPhoto src={message.senderPhotoURL || basicProfileImg} alt="Profile" />
              <SenderName>{message.senderName}</SenderName>
            </SenderInfo>
            <MessageContent isMine={message.sender === userState.userInfomation.uid}>
              {message.text}
              {message.attachmentUrl && message.attachmentUrl.endsWith('.mp4') ? (
                <video src={message.attachmentUrl} controls />
              ) : (
                message.attachmentUrl && <img src={message.attachmentUrl} alt="Attached Image" style={{maxWidth: '100%', height: 'auto'}} />
              )}
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
      <ChatInput onSendMessage={(messageText, attachmentUrl) => {
        // 로직은 ChatInput 컴포넌트에서 구현됩니다.
      }} />
    </ChatContainer>
  );
};

export default ChatContainerComponent;

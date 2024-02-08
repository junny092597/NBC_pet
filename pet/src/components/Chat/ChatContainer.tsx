import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import ChatInput from './ChatInput'; // Adjust the import path as needed
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom'; // Adjust the import path as needed
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import basicProfileImg from '../../assets/images/logo.png'; // Adjust the import path as needed

const socket = io('https://nbc-pet-server-hyungjun.koyeb.app'); // Adjust the server URL as needed

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  height: 80vh;
`;

const ChatListContainer = styled.div`
  flex: 2.4;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #fafafa;
`;

const ChatRoomItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const ChatContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
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
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  padding: 5px;
  max-width: 60%;
`;

const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
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

const MessageContent = styled.div<{ isMine: boolean }>`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isMine ? "#dcf8c6" : "#ffffff")};
  word-wrap: break-word;
`;

const OnlineUsersContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #fafafa;
`;

const ChatContainerComponent: React.FC = () => {
  const [userState, setUserState] = useRecoilState(userInfo);
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsersInfo, setOnlineUsersInfo] = useState<{ id: string, nickname: string }[]>([]);
  const [chatRooms, setChatRooms] = useState<string[]>(['추가 채팅방은', '추후에', '업데이트됩니다']);

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

    socket.on('online users', (users: any[]) => {
      // Assume server sends an array of objects with id and nickname
      setOnlineUsersInfo(users);
    });

    return () => {
      socket.off('chat message');
      socket.off('online users');
    };
  }, [setUserState]);

  const handleSendMessage = (messageText: string, attachmentUrl: string | null) => {
    if (userState.isLogin) {
      const { uid, nickName } = userState.userInfomation;
      const photoURL = userState.userInfomation.photoURL || basicProfileImg;

      socket.emit('chat message', {
        text: messageText,
        sender: uid,
        senderName: nickName,
        senderPhotoURL: photoURL,
        attachmentUrl,
      });
    }
  };

  return (
    <PageContainer>
      <ChatListContainer>
        {chatRooms.map((room, index) => (
          <ChatRoomItem key={index}>{room}</ChatRoomItem>
        ))}
      </ChatListContainer>
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
                  <video src={message.attachmentUrl} controls style={{maxWidth: "100%", height: "auto"}} />
                ) : (
                  message.attachmentUrl && <img src={message.attachmentUrl} alt="Attached Image" style={{maxWidth: "100%", height: "auto"}} />
                )}
              </MessageContent>
            </MessageItem>
          ))}
        </MessageList>
        <ChatInput onSendMessage={handleSendMessage} />
      </ChatContainer>
      <OnlineUsersContainer>
        {onlineUsersInfo.map((user, index) => (
          <div key={index}>{user.nickname}</div> // Display the nickname
        ))}
      </OnlineUsersContainer>
    </PageContainer>
  );
};

export default ChatContainerComponent;

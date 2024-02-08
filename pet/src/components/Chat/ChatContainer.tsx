import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom'; // 프로젝트에 맞게 조정하세요.
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage } from '../../Firebase'; // 프로젝트에 맞게 조정하세요.
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import basicProfileImg from '../../assets/images/logo.png'; // 프로젝트에 맞게 조정하세요.
import ChatInput from './ChatInput';

const socket = io('https://nbc-pet-server-hyungjun.koyeb.app'); // 서버 URL은 프로젝트에 맞게 조정하세요.

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
  border: 1px solid #e1e1e1; /* 이 부분은 유지 */
  border-radius: 8px;
  overflow-y: auto;
  background-color: #FFF8E3; /* 배경색 변경 */
`;
const ChatRoomItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 3px solid #ccc; /* 선의 굵기를 더 굵게 변경 */
  border-radius: 8px;
  background-color: #FFF8E3; /* 필요하다면 채팅방 아이템의 배경색도 설정할 수 있습니다 */
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2; /* 호버 시 배경색 변경, 이 부분은 선택사항 */
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
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  flex-direction: row;
  padding: 5px;
  max-width: 60%;
  margin-left: ${(props) => (props.isMine ? 'auto' : '0')};
  margin-right: ${(props) => (props.isMine ? '0' : 'auto')};
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
  background-color: ${(props) => (props.isMine ? "#FFFBEE" : "#C7F5D7")}; /* 조건부 스타일 적용 */
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserState({
          isLogin: true,
          userInfomation: { // 오타 수정: userInfomation
            uid: firebaseUser.uid,
            nickName: firebaseUser.displayName || 'Anonymous',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || basicProfileImg,
          },
        });

        // 서버에 사용자 닉네임 전송
        socket.emit('user nickname', firebaseUser.displayName || 'Anonymous');
      } else {
        setUserState(oldState => ({...oldState, isLogin: false}));
      }
    });

    socket.on('chat message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('online users', (users: any[]) => {
      setOnlineUsersInfo(users);
    });

    return () => {
      socket.off('chat message');
      socket.off('online users');
    };
  }, [setUserState]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;

    const fileRef = storageRef(storage, `uploads/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(fileRef, selectedFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSendMessage = async (messageText: string) => {
    if (!userState.isLogin) return;
  
    let attachmentUrl = null;
    if (selectedFile) {
      attachmentUrl = await uploadFile();
    }
  
    const { uid, nickName } = userState.userInfomation; // 'userInfomation'으로 수정
    const photoURL = userState.userInfomation.photoURL || basicProfileImg; // 'userInfomation'으로 수정
  
    socket.emit('chat message', {
      text: messageText,
      sender: uid,
      senderName: nickName,
      senderPhotoURL: photoURL,
      attachmentUrl,
    });
  
    setSelectedFile(null); // Reset selected file
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
            <MessageContent isMine={message.sender === userState.userInfomation.uid}> {/* 이 부분이 수정되었습니다. */}
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
        <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current?.click()}>Attach File</button>
      </ChatContainer>
      <OnlineUsersContainer>
        {onlineUsersInfo.map((user, index) => (
          <div key={index}>{user.nickname}</div>
        ))}
      </OnlineUsersContainer>
    </PageContainer>
  );
};

export default ChatContainerComponent;

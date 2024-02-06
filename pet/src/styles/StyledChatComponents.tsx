// src/styles/StyledChatComponents.tsx
import styled from 'styled-components';

export const ChatContainer = styled.div`
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

export const MessageList = styled.ul`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  list-style: none;
`;

export const MessageItem = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  width: 100%;
  margin: 10px 0;
`;
export const MessageContent = styled.div<{ isMine: boolean }>`
  max-width: 50%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isMine ? "#dcf8c6" : "#ffffff")};
  text-align: left;
`;

export const ChatInputField = styled.input`
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

export const UserName = styled.div`
  font-weight: bold;
`;


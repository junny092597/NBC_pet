export interface Message {
    id: string;
    text: string;
    sender: string; // 메시지를 보낸 사람의 식별자
    senderName: string; // 메시지를 보낸 사람의 닉네임
    senderPhotoURL: string; // 메시지를 보낸 사람의 프로필 사진 URL
    isMine: boolean; // 메시지가 현재 로그인한 사용자에 의해 보내진 것인지 여부
  }
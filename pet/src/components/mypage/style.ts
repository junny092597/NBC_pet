import styled from 'styled-components';

// MyPages
export const MyPageAll = styled.div``;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    /* 모바일 화면일 때의 스타일 */
    align-items: flex-start;
  }
`;

export const ProfileImgWrapper = styled.div`
  margin-top: 65px;
`;

export const ProfileImgShow = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20%;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    /* 모바일 화면일 때의 스타일 */
    width: 150px;
    height: 150px;
  }
`;

export const ProfileNickname = styled.h3`
  font-family: GmarketSansMedium;
  font-size: 28px;
  color: black;
  margin: 20px 0 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 1;

  @media screen and (max-width: 768px) {
    /* 모바일 화면일 때의 스타일 */
    font-size: 20px;
  }
`;

export const ModifyCompleteButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

export const TabContainer = styled.div``;

export const ProfileImgLabel = styled.label`
  width: 200px;
  height: 200px;
  border-radius: 70%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ProfileImgInput = styled.input``;
export const EditModalAll = styled.div`
`;

export const EditModalBtnText = styled.div`
  cursor: pointer;
  color: black;
  font-size: 25px;
`;

export const EditModalTitle = styled.ul`
  padding: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  list-style: none;
`;

export const EditModalImgInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 5px;
`;

export const EditModalProfileImgLabel = styled.label`
  width: 180px;
  height: 180px;
  border: 1px solid #F0F0E6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const EditModalProfileImgShow = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 70%;
  border: 1px solid;
`;

export const EditModalProfileImgInput = styled.input``;

export const EditModalNicknameInputWrapper = styled.div`
  margin-top: 15px;
`;

export const EditModalNicknameInput = styled.input`
  width: 370px;
  height: 45px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
`;

export const EditModalEmailInputWrpper = styled.div`
  margin-top: 30px;
`;

export const EditModalEmailText = styled.p`
  font-family: GmarketSansMedium;
  font-weight: 700;
  font-size: 16px;
  /* line-height: 19px; */
  margin-bottom: 0.2rem;
  color: black;
`;
/*
 * 모달창 버튼
 */
export const EditModalBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 3rem;
`;

export const EditModalCanceleButton = styled.button`
  cursor: pointer;
  padding: 8px;
  gap: 8px;
  width: 170px;
  height: 60px;
  background: #81BE97;
  border: 1px solid;
  border-radius: 8px;
  font-family: GmarketSansMedium;
  font-size: 16px;
  text-align: center;
  color: white;
`;

export const EditModalCompleteButton = styled.button`
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 60px;
  background: #81BE97;
  border: 1px solid;
  border-radius: 8px;
  font-family: GmarketSansMedium;
  font-size: 16px;
  text-align: center;
  color: white;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const EditModalEmailInput = styled.input`
  width: 370px;
  height: 45px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
`;

export const MyContentBox1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MyTitleTab = styled.h2`
  font-family: GmarketSansMedium;
  background-color: transparent;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  display: block;
  border: none;
  color: black;
  padding-bottom: 10px;
  margin-top: 13px;
  text-decoration: none;

  cursor: pointer;
  width: 40%;
  &.active {
    color: #405F4C;
    border-bottom: 2px solid #405F4C;
  }
`;


//////////////////////////////////////////////
export const MyBookmarkReportWrap = styled.div``;

export const MyBookmarkReportContainer = styled.div``;

export const MyBookmarkReportBox = styled.div`
  /* background: gray;
  border: 1px solid gray; */
  border-radius: 0px 8px 8px 0px;
  padding: 0 15px;
`;

export const MyBookmarkReportTabMenu = styled.ul`
  padding: 0;
  height: 50px;
  display: flex;
  /* flex-direction: row; */
  /* justify-content: space-around; */
  align-items: center;
  /* border-bottom: 2px solid gray; */
`;

export const MyTitleTabTitleBox = styled.div``;

export const MyTitleTabBtn = styled.button`
  background-color: transparent;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  display: block;
  border: none;
  color: gray;
  padding-bottom: 10px;
  margin-top: 13px;
  text-decoration: none;
  cursor: pointer;
  width: 50%;
  &.active {
    padding-bottom: 12.5px;
    color: green;
    border-bottom: 4px solid green;
  }
`;

export const MyContentBox = styled.div`
  /* height: 800px;
  margin-left: 10px;
  overflow-y: auto;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: gray;
  } */
`;


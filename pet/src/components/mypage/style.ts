import styled from 'styled-components';

// MyPages
export const MyPageAll = styled.div``;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

export const ModifyCompleteButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

export const TabContainer = styled.div``;

// MyProfileModal
export const Text = styled.div`
  font-size: 20px;
`;

export const InfoTitle = styled.p`
  font-family: GmarketSansMedium;
  font-size: 16px;
  margin-bottom: 0.2rem;
  color: black;
`;

export const InfoHolder = styled.div`
  width: 252px;
  height: 48px;
  border: 1px solid;
  background-color: black;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 90px 0 36px;

  @media screen and (max-width: 1150px) {
    margin-top: 30px;
  }
`;

export const ModifyDeleteButton = styled.button``;

// 이미지 수정, 업로드 관련 스타일링
export const ImgModifyButton = styled.button``;

/*
 * 이미지 라벨
 */
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

export const InfoWrapper = styled.div`
  margin-top: 21px;
`;

export const EmailInputDiv = styled.div`
  width: 80%;
  height: 48px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  background-color: black;
`;

export const MyBookmarkReportWrap = styled.div``;

/*
 * 프로필 모달창
 */

export const EditModalAll = styled.div`
`;

export const EditModalBtnText = styled.div`
  cursor: pointer;
  color: black;
  font-size: 25px;
`;

export const EditModalTitle = styled.div`
  font-family: GmarketSansMedium;
  font-weight: 800;
  font-size: 23px;
  color: black;
`;

export const EditModalImgInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 5px;
`;

export const EnterInputPasswordWrapper = styled.div``;

export const EditModalProfileImgLabel = styled.label`
  width: 160px;
  height: 160px;
  border-radius: 70%;
  border: 1px solid;
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
  margin-top: 30px;
`;

export const EditModalText = styled.p`
  font-family: GmarketSansMedium;
  font-size: 16px;
  margin-bottom: 0.3rem;
  color: black;
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
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 0.4rem;
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

export const MyContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MyProfileStar1 = styled.img`
  position: relative;
  top: -80px;
  left: 58px;
`;

export const MyProfileStar2 = styled.img`
  position: relative;
  bottom: -65px;
  right: 40px;
`;

// MyPagePost
export const ReportWrap = styled.div`
  width: 100%;
`;
export const BookMarkStore = styled.div``;
export const MyBookmarkReportBox = styled.div``;

export const MyTitleTabBtn = styled.button`
  background-color: transparent;
  font-family: GmarketSansMedium;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  display: block;
  border: none;
  color: black;
  padding-bottom: 1px;
  margin-top: 7px;
  margin-right: 16px;
  text-decoration: none;

  cursor: pointer;
  width: 50%;
  &.active {
    color: black;
    border-bottom: 2px solid;
  }
`;

export const MyTitleTab = styled.h2`
  font-family: GmarketSansMedium;
  font-weight: bold;
  font-size: 25px;
  color: black;
  margin-top: 16px;
  margin-left: 16px;
`;

export const MyBookmarkReportTabMenu = styled.ul`
  padding: 0;
  height: 50px;
  display: flex;
  border-bottom: 0;
`;



export const MyPageTabWrap = styled.div``;
export const MyPageTablist = styled.ul``;
export const MyPageTebBtn = styled.button``;

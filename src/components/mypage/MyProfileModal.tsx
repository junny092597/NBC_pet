import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from '../../atom';
import { editModal, userUrl } from '../../atom';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../Firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as S from './style';
import Swal from 'sweetalert2';
import testimg from '../../assets/images/logo.png';
import success from '../../assets/images/성공.webp';
import error from '../../assets/images/erroricon.png';
import { createGlobalStyle } from 'styled-components';

import { PiPencilLineFill } from 'react-icons/pi';
import Password from './postpage/Password';

const GlobalStyle = createGlobalStyle`
  .swal2-container {
    z-index: 10000; /* 또는 필요한 z-index 값으로 설정하세요 */
  }
`;

const MyProfileEditModal = () => {
  const [profileUrl, setProfileUrl] = useRecoilState(profileState);
  // const [isActive, setIsActive] = useState<boolean>(true);
  const [isActiveTab1, setIsActiveTab1] = useState(true);
  const [isActiveTab2, setIsActiveTab2] = useState(false);

  // 모달
  const [open, setOpen] = useRecoilState(editModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 닉네임
  const currentUserInfos = auth.currentUser; // 현재 로그인한 사용자의 정보들(파이어베이스)
  const [nickname, setNickname] = useState<any>(auth.currentUser?.displayName); // 현재 닉네임 상태변경
  const [currentUser, setCurrentUser] = useState<any>(''); // 현재 로그인한 사용자 가져오기

  // 이미지
  const [imgProfileUrl, setImgProfileUrl] = useRecoilState(profileState);
  const [imgFile, setImgFile] = useState<string>(''); // 이미지 파일 엄청 긴 이름
  const [imgUploadUrl, setImgUploadUrl] = useRecoilState<string>(userUrl); // 변경된 이미지 url

  // 현재 로그인한 사용자 가져오기
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(currentUserInfos);
        setNickname(currentUserInfos?.displayName);
      } else {
        return;
      }
    });
  }, [currentUserInfos]);

  // 변경할 닉네임 받아오는 함수
  const ToChangeNicknameInput = (e: any) => {
    setNickname(e.target.value);
  };

  // 수정 확인 시 유효성 검사.
  const nicknameChangeOnClick: any = async () => {
    if (nickname.length < 2 || nickname.length > 8) {
      Swal.fire({
        title: '2글자 이상 8글자 이하로 </br>입력해주세요.',
        confirmButtonColor: '#A1EEBD',
        confirmButtonText: '확인',
        imageUrl: error,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: 'Custom image',
      });
      return;
    }
    if (imgFile.length === 0) {
      try {
        await updateProfile(currentUser, {
          displayName: nickname,
        });
        Swal.fire({
          title: '프로필 수정 완료',
          confirmButtonColor: '#A1EEBD',
          confirmButtonText: '확인',
          imageUrl: success,
          imageWidth: 130,
          imageHeight: 130,
          imageAlt: 'Custom image',
        });
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const imgRef = ref(storage, `profileUploadImg.${uuidv4()}`);
        // Storage에 이미지 업로드
        const response = await uploadString(imgRef, imgFile, 'data_url');
        // 업로드한 이미지의 url 가져오기
        const downloadImageUrl = await getDownloadURL(response.ref);
        await updateProfile(currentUser, {
          displayName: nickname,
          photoURL: downloadImageUrl,
        });
        setNickname(nickname);
        setImgUploadUrl(downloadImageUrl);
        setProfileUrl(downloadImageUrl);
        setImgProfileUrl(downloadImageUrl);
        setOpen(false);
        setImgFile('');
        Swal.fire({
          title: '프로필 수정 완료',
          confirmButtonColor: '#A1EEBD',
          confirmButtonText: '확인',
          imageUrl: success,
          imageWidth: 130,
          imageHeight: 130,
          imageAlt: 'Custom image',
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 업로드 시 이미지 미리보기 바로 반영
  const saveNewProfileImg = (e: any) => {
    const target = e.currentTarget;
    const theFile = (target.files as FileList)[0]; // 이미지 인풋창에서 클릭하면 이미지
    setImgFile(theFile.name);
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent: any) => {
      setImgFile(finishedEvent.currentTarget.result);
      setImgProfileUrl(finishedEvent.currentTarget.result);
    };
  };

  return (
    <>
      <GlobalStyle />
      <S.EditModalBtnText onClick={handleOpen}>
        <PiPencilLineFill />
      </S.EditModalBtnText>
      <Modal open={open} onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description">
        <S.EditModalAll>
          <Box sx={style}>
          <S.EditModalTitle>
              <S.MyTitleTab
              className={isActiveTab1 ? 'active' : ''}
               onClick={()=> {setIsActiveTab1(true); setIsActiveTab2(false);}}
               >
               회원정보수정
               </S.MyTitleTab>
               <S.MyTitleTab
              className={isActiveTab2 ? 'active' : ''}
               onClick={()=> {setIsActiveTab1(false); setIsActiveTab2(true);}}
               >
              비밀번호변경
               </S.MyTitleTab>
               </S.EditModalTitle>
               {isActiveTab1 ? (
              <S.MyContentBox>
                <S.EditModalImgInputWrapper>
                  <S.EditModalProfileImgLabel htmlFor="modalProfileUploadImg">
                    {imgProfileUrl ? (
                      <S.EditModalProfileImgShow src={imgProfileUrl} />
                    ) : (
                      <S.EditModalProfileImgShow src={testimg} />
                    )}
                    <S.EditModalProfileImgInput
                      type="file"
                      accept="image/*"
                      id="modalProfileUploadImg"
                      onChange={saveNewProfileImg}
                      style={{ display: 'none' }}
                    />
                  </S.EditModalProfileImgLabel>
                </S.EditModalImgInputWrapper>
                <S.EditModalNicknameInputWrapper>
                  <S.EditModalEmailText>닉네임</S.EditModalEmailText>
                  <S.EditModalNicknameInput
                    type="text"
                    placeholder={'닉네임을 입력해주세요'}
                    onChange={ToChangeNicknameInput}
                    value={nickname}
                  />
                </S.EditModalNicknameInputWrapper>
                <S.EditModalEmailInputWrpper>
                  <S.EditModalEmailText>이메일(아이디)</S.EditModalEmailText>
                  <S.EditModalEmailInput placeholder={currentUser?.email} readOnly />
                </S.EditModalEmailInputWrpper>
                <S.EditModalBtnWrapper>
                  <S.EditModalCanceleButton onClick={handleClose}>취소</S.EditModalCanceleButton>
                  <S.EditModalCompleteButton onClick={nicknameChangeOnClick} type="submit">
                    수정
                  </S.EditModalCompleteButton>
                </S.EditModalBtnWrapper>
              </S.MyContentBox>
              ):(
                <Password handleClose={handleClose} />
              )}
          </Box>
        </S.EditModalAll>
      </Modal>
    </>
  );
};
export default MyProfileEditModal;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '600px',
  bgcolor: '#F0F0E6',
  border: '2px solid transparent',
  boxShadow: 23,
  p: 4,
  zIndex: 10000,
};

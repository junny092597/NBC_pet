// library
import { useEffect, useState } from 'react';
import { userInfo } from '../../atom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { editModal, profileState } from '../../atom';
// firebase
import { auth } from '../../Firebase';

import * as S from './style';

import basicProfileImg from '../../assets/images/logo.png';
import { User } from 'firebase/auth';
import MyProfileEditModal from './MyProfileEditModal';

type CurrentUserProfile = User | null;

const MyProfile = () => {
  const user = useRecoilValue(userInfo);
  const currentUserProfile: CurrentUserProfile = auth.currentUser;
  const [open, setOpen] = useRecoilState(editModal);
  const handleOpen = () => setOpen(true);
  const [currentUser, setCurrentUser] = useState<any>('');
  const [imgUploadUrl, setImgUploadUrl] = useState<string | null>(); // 업로드한 이미지 url
  const [imgProfileUrl, setImgProfileUrl] = useRecoilState(profileState);
  const currentUserInfos: User | null = auth.currentUser;

  // 현재 로그인한 사용자 가져오기
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(auth.currentUser);
        setImgUploadUrl(user.photoURL);
      } else {
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (currentUserInfos?.photoURL !== undefined) {
      setImgProfileUrl(currentUserInfos?.photoURL || '');
    }
  }, [currentUserInfos?.photoURL, setImgProfileUrl]);

  return (
    <S.MyPageAll>
      <S.MyProfileBox>
        <S.ProfileImgLabelInputWrapper>
          <S.ProfileImgShow
            src={currentUserProfile?.photoURL ? currentUserProfile?.photoURL : basicProfileImg}
            onClick={handleOpen}
          />
        </S.ProfileImgLabelInputWrapper>
        <S.MyProfileNickname>
          {currentUser.displayName ? currentUser.displayName : user.userInfomation.nickName}님
        </S.MyProfileNickname>
        <S.WelcomeText>환영합니다</S.WelcomeText>
        <S.ModifyCompleteButton type="button">
          <MyProfileEditModal />
        </S.ModifyCompleteButton>
      </S.MyProfileBox>
      <S.TabContainer></S.TabContainer>
    </S.MyPageAll>
  );
};

export default MyProfile;

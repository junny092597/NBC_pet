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
import MyProfileModal from './MyProfileModal';

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

  // 현재 로그인한 사용자 정보 가져오기
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
      // setImgProfileUrl 함수를 호출하여 이미지 프로필 URL을 업데이트
      setImgProfileUrl(currentUserInfos?.photoURL || '');
    }
  }, [currentUserInfos?.photoURL, setImgProfileUrl]);

  return (
    <S.MyPageAll>
      <S.ProfileContainer>
        <S.ProfileImgWrapper>
          <S.ProfileImgShow
            src={currentUserProfile?.photoURL ? currentUserProfile?.photoURL : basicProfileImg}
            onClick={handleOpen}
          />
        </S.ProfileImgWrapper>
      <S.ProfileNickname>
          {currentUser.displayName ? currentUser.displayName : user.userInfomation.displayName}
          <S.ModifyCompleteButton type="button">
            <MyProfileModal />
          </S.ModifyCompleteButton>
        </S.ProfileNickname>
        </S.ProfileContainer>
      {/* <S.TabContainer></S.TabContainer> */}
    </S.MyPageAll>
  );
};

export default MyProfile;

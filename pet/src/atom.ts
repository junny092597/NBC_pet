import { atom } from 'recoil';
import { UserInfoState } from './types/User';

// atom은 두 가지를 요구하는데 첫 번째는 key로 유니크해야한다.
// 두 번째는 default 값이 필요하다.

interface ModalStatus {
  [key: string]: boolean;
}

export const userInfo = atom<UserInfoState>({
  key: 'user',
  default: {
    isLogin: false,
    userInfomation: {
      nickName: '',
      emil: '',
      photoURL: '',
      uid: '',
    },
  },
});

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    emil: '',
    nickName: '',
    id: '',
  },
});

export const profileState = atom<string>({
  key: 'profileState',
  default: '',
});

export const userUrl = atom({
  key: 'userUrl',
  default: '',
});

export const modalStatus = atom<ModalStatus>({
  key: 'modal',
  default: {
    master: false,
    logout: false,
    singout: false,
    validPhoneNumber: false,
    phoneValidComplete: false,
    invalidVerificationCode: false,
    codeExpired: false,
    signUpComplete: false,
    emailAlreadyInUse: false,
    signoutComplete: false,
    login: false,
    loginError: false,
    userNotFound: false,
    wrongPassword: false,
    globalBtn: false,
    newStoreReport: false,
  },
});

export const editModal = atom<boolean>({
  key: 'editModalStatus',
  default: false,
});

export const modalPage = atom<string>({
  key: 'modalPage',
  default: '',
});

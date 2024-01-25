import { atom } from 'recoil';
import { UserInfoState } from './types/User';

// atom은 두 가지를 요구하는데 첫 번째는 key로 유니크해야한다.
// 두 번째는 default 값이 필요하다.

export const userInfo = atom<UserInfoState>({
  key: 'user',
  default: {
    isLogin: false,
    userInfomation: {
      displayName: '',
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
    displayName: '',
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


export const editModal = atom<boolean>({
  key: 'editModalStatus',
  default: false,
});

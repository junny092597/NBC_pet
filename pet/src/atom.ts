import { atom } from 'recoil';
import { UserInfoState } from './types/User';

// atom은 두 가지를 요구하는데 첫 번째는 key로 유니크해야한다.
// 두 번째는 default 값이 필요하다.

export const userInfo = atom<UserInfoState>({
  key: 'user',
  default: {
    isLogin: false,
    userInfomation: {
      nickName: '',
      email: '',
      photoURL: '',
      uid: '',
      }
    },
  })

export const userInfoState  = atom({
  key: 'userInfoState ',
  default: {
    email: '',
    nickname: '',
    id: '',
    accessToken: '',
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

export const mypagemenu = atom<number>({
  key: 'mypagemenu',
  default: 0,
})

export const isActiveMenu = atom<number>({
  key: 'isActiveMenu',
  default: 0,
});

export const selectedTabData = atom<any>({
  key: 'selectedTabData',
  default: null,
});



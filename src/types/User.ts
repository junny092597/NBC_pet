export interface UserInfoState {
    isLogin: boolean;
    userInfomation: UserInfomation 
}

export interface UserInfomation  {
    nickName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string | null;
}
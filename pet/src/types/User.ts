export interface UserInfoState {
    isLogin: boolean;
    userInfomation: UserInfomation 
}

export interface UserInfomation {
    displayName: string | null;
    emil: string | null;
    photoURL: string | null;
    uid: string | null;
}
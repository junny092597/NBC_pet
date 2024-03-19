import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  email: string | null;
  displayName: string | null;
  uid: string | null;
  photoURL: string | null;
}

const initialState: AuthState = {
  isLogin: !!localStorage.getItem('uid'),
  email: localStorage.getItem('email'),
  displayName: localStorage.getItem('displayName'),
  uid: localStorage.getItem('uid'),
  photoURL: localStorage.getItem('photoURL'),
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { email, displayName, uid, photoURL } = action.payload;
      localStorage.setItem('email', email || '');
      localStorage.setItem('displayName', displayName || '');
      localStorage.setItem('uid', uid || '');
      localStorage.setItem('photoURL', photoURL || '');
      state.isLogin = true;
      state.email = email || null;
      state.displayName = displayName || null;
      state.uid = uid || null;
      state.photoURL = photoURL || null;
    },
    logout: state => {
      localStorage.clear();
      state.isLogin = false;
      state.email = null;
      state.displayName = null;
      state.uid = null;
      state.photoURL = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

// updateNickname: (state, action: PayloadAction<string>) => {
//   localStorage.setItem("displayName", action.payload);
//   state.displayName = action.payload;
// },

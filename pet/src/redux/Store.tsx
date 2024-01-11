import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './modules/authSlice'


const Store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,},
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;

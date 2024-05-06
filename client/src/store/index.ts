import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/authSlice';
import logger from 'redux-logger';
import allProgramsSlice from './allProgramSlice/allProgramsSlice';
import myProgramSlice from './myProgramSlice/userProgramSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allPrograms: allProgramsSlice,
    userPrograms: myProgramSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

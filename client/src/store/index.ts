import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/authSlice';
import logger from 'redux-logger';
import allProgramsSlice from './allProgramSlice/allProgramsSlice';
import myProgramSlice from './myProgramSlice/userProgramSlice';
import userProgsExcercises from './userProgsExcersicesSlice/userProgsExercises';
import userSchedule from './userScheduleSlice/userSchedule';
import userProgIdForMonth from './userProgIdForMonth/userProgIdForMonth';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allPrograms: allProgramsSlice,
    userPrograms: myProgramSlice,
    userProgsExercises: userProgsExcercises,
    userShedule: userSchedule,
    userProgIdForMonth: userProgIdForMonth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

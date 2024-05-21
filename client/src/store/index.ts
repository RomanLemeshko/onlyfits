import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/authSlice';
import logger from 'redux-logger';
import allProgramsSlice from './allProgramSlice/allProgramsSlice';
import myProgramSlice from './myProgramSlice/userProgramSlice';
import userProgsExercises from './userProgsExcersicesSlice/userProgsExercises';
import userSchedule from './userScheduleSlice/userSchedule';
import userProgIdForMonth from './userProgIdForMonth/userProgIdForMonth';
import allRecipiesSlice from './allRecipies/allRecipies';
import messageSlice from './messageSlice/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    messages: messageSlice,
    allPrograms: allProgramsSlice,
    userPrograms: myProgramSlice,
    userProgsExercises: userProgsExercises,
    userSсhedule: userSchedule,
    userProgIdForMonth: userProgIdForMonth,
    allRecipies: allRecipiesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
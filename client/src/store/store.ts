import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import logger from 'redux-logger';
import allProgramsSlice from './allProgramSlice/allProgramsSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    allPrograms: allProgramsSlice


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
  )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default {store};

import { createSlice } from '@reduxjs/toolkit';

export interface UserShedule {
  schedule: string;
}

const initialState: UserShedule = { schedule: '' };

const userSchedule = createSlice({
  name: 'userSchedule',
  initialState,
  reducers: {
    getUserSchedule: (state, action) => {
      return { ...state, schedule: action.payload };
    },
  },
});

export const { getUserSchedule } = userSchedule.actions;

export default userSchedule.reducer;

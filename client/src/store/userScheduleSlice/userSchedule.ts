import { createSlice } from '@reduxjs/toolkit';

export interface UserSсhedule {
  schedule: string;
}

const initialState: UserSсhedule = { schedule: '' };

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

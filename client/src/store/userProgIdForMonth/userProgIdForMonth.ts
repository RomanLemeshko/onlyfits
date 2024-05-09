import { createSlice } from '@reduxjs/toolkit';

export interface UserProgId {
  progId: string;
}

const initialState: UserProgId = { progId: '' };

const userProgIdForMonth = createSlice({
  name: 'userProgIdForMonth',
  initialState,
  reducers: {
    getUserProgIdForMonth: (state, action) => {
      return { ...state, schedule: action.payload };
    },
  },
});

export const { getUserProgIdForMonth } = userProgIdForMonth.actions;

export default userProgIdForMonth.reducer;

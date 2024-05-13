import { createSlice } from '@reduxjs/toolkit';

export interface UserProgId {
  progId: number;
}

const initialState: UserProgId = { progId: 0 };

const userProgIdForMonth = createSlice({
  name: 'userProgIdForMonth',
  initialState,
  reducers: {
    getUserProgIdForMonth: (state, action) => {
      return { ...state, progId: action.payload };
    },
  },
});
export const { getUserProgIdForMonth } = userProgIdForMonth.actions;

export default userProgIdForMonth.reducer;

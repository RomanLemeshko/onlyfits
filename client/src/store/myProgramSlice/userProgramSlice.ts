import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InitialState {
  id: number;
  program_title: string;
  program_type: string;
  program_level: string;
  program_rating: number;
  training_days: number;
}

export interface Data {
  user_id: number;
  program_id: number;
}
const initialState: InitialState[] = [];

export const getUserProgramsThunky = createAsyncThunk(
  'allUserProg', //! it is just thunk name, could be any
  async (user_id: number) => {
    try {
      const allPrograms = await axios.get(
        'http://localhost:3000/api/get-user-programs',
        {
          params: { user_id },
          withCredentials: true,
        }
      );
      console.log('THUNK: ', user_id);
      return allPrograms.data; //! do not forget about seriliazation
    } catch (error) {
      console.log('ОШИБКА ПРИ ПОЛУЧЕНИИ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ', error);
    }
  }
);

export const addUserProgramsThunky = createAsyncThunk(
  'addUserProg', //! it is just thunk name, could be any
  async (data: Data) => {
    try {
      const allPrograms = await axios.post(
        'http://localhost:3000/api/add-user-program',
        data,
        { withCredentials: true }
      );
      // console.log("THUNK: ", allPrograms.data)
      return allPrograms.data; //! do not forget about seriliazation
    } catch (error) {
      console.log('ОШИБКА ПРИ ДОБВЛЕНИИ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ', error);
    }
  }
);

const myProgramSlice = createSlice({
  name: 'myProgram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProgramsThunky.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(addUserProgramsThunky.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
  },
});

export default myProgramSlice.reducer;

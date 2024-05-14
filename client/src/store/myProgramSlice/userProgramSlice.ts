import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Program {
  id: number;
  program_type: string;
  program_title: string;
  training_days: number;
  program_level: string;
  program_rating: number;
  presentation:string,
  description:string;
  url: string
}

interface InitialState {
  programs: Program[];
  error?: string;
}

const initialState: InitialState = {
  programs: [],
  error: undefined
};

export const getUserProgramsThunky = createAsyncThunk(
  'allUserProg',
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_URL}/api/get-user-programs`,
        { params: { user_id }, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('ОШИБКА ПРИ ПОЛУЧЕНИИ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ');
    }
  }
);

export const addUserProgramsThunky = createAsyncThunk(
  'addUserProg',
  async (data: { user_id: number; program_id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/api/add-user-program`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('ОШИБКА ПРИ ДОБАВЛЕНИИ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ');
    }
  }
);


export const deleteUserProgramsThunky = createAsyncThunk(
  'deleteUserProg',
  async (data: { user_id: number; program_id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST_URL}/api/delete-user-program`,
       
        {  data, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('ОШИБКА ПРИ ДОБАВЛЕНИИ ПРОГРАММ ПОЛЬЗОВАТЕЛЯ');
    }
  }
);

const myProgramSlice = createSlice({
  name: 'myProgram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProgramsThunky.fulfilled, (state, action) => {
      state.programs = action.payload;
    });
    builder.addCase(getUserProgramsThunky.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(addUserProgramsThunky.fulfilled, (state, action) => {
      state.programs = [...state.programs, action.payload];
    });
    builder.addCase(addUserProgramsThunky.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(deleteUserProgramsThunky.fulfilled, (state, action) => {
      state.programs = state.programs.filter((each) => each.id !==action.payload.program_id);
    });
    // builder.addCase(deleteUserProgramsThunky.rejected, (state, action) => {
    //   state.error = action.payload as string;
    // });
  },
});

export default myProgramSlice.reducer;

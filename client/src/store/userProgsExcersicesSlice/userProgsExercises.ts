import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface excercisesProg {
  id: number;
  program_id: number;
  exercise_title: string;
  duration: number;
  rest_time: number;
}
export type Prog_Ids = number[];

const initialState: excercisesProg[][] = [];

export const getUserProgramsExercisesThunky = createAsyncThunk(
  'userProgExercises', //! it is just thunk name, could be any
  async (prog_ids: Prog_Ids) => {
    console.log('SEREGA BRO: ', prog_ids);
    try {
      const allProgramsExercises = await axios.get(
        `${import.meta.env.VITE_HOST_URL}/api/get-user-programs-exercises`,
        {
          params: { prog_ids },
          withCredentials: true,
        }
      );
      return allProgramsExercises.data; //! do not forget about seriliazation
    } catch (error) {
      console.log(
        'ОШИБКА ПРИ ПОЛУЧЕНИИ УПРАЖНЕНИЙ ИЗ ПРОГРАМ ПОЛЬЗОВАТЕЛЯ',
        error
      );
    }
  }
);

const userProgsExercises = createSlice({
  name: 'myProgram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProgramsExercisesThunky.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default userProgsExercises.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InitialState {
  id: number;
  program_title: string;
  program_type: string;
  program_level: string;
  program_raiting: number;
  training_days: number;
}

interface Filter {
  filterByType: string;
  filterByLevel: string;
}

const initialState: InitialState[] = [];

//thunk to add data from db to store initially
export const getAllProgramsThunky = createAsyncThunk(
  'allProg', //! it is just thunk name, could be any
  async () => {
    try {
      const allPrograms = await axios.get(
        'http://localhost:3000/api/getAllPrograms',
        { withCredentials: true }
      );
      console.log("THUNK: ", allPrograms.data)
      return allPrograms.data; //! do not forget about seriliazation
    } catch (error) {
      console.log('ОШИБКА ПРИ ПОЛУЧЕНИИ ВСЕХ ПРОГРАММ ', error);
    }
  }
);

const allProgramsSlice = createSlice({
  name: 'allPrograms', //! current slice name
  initialState,
  reducers: {
    // programFilterByType: (state, action: PayloadAction<string>) =>{
    //   return state.filter((eachProgram) => eachProgram.program_type === action.payload)
    // },
    programFilterByLevel: (state, action: PayloadAction<Filter>) => {
      return state.filter(
        (eachProgram) =>
          eachProgram.program_level === action.payload.filterByLevel &&
          eachProgram.program_type === action.payload.filterByType
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProgramsThunky.fulfilled, (state, action) => {
      console.log("EXTRA: ", state, action)
      return action.payload;
    });
  },
 
});

export const { programFilterByLevel } = allProgramsSlice.actions;

export default allProgramsSlice.reducer;

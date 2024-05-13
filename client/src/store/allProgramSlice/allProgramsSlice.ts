import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Program {
  id: number;
  program_title: string;
  program_type: string;
  program_level: string;
  program_rating: number;
  training_days: number;
}

interface ProgramsState {
  programs: Program[];
  filteredPrograms: Program[];
}

const initialState: ProgramsState = {
  programs: [],
  filteredPrograms: []
};

export const getAllProgramsThunky = createAsyncThunk(
  'allPrograms/getAllPrograms',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/getAllPrograms`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('ОШИБКА ПРИ ПОЛУЧЕНИИ ВСЕХ ПРОГРАММ', error);
      return [];
    }
  }
);

const allProgramsSlice = createSlice({
  name: 'allPrograms',
  initialState,
  reducers: {
    setFilteredPrograms: (state, action: PayloadAction<{ type: string; level: string }>) => {
      state.filteredPrograms = state.programs.filter(program => {
        const matchesType = action.payload.type === 'all' || program.program_type === action.payload.type;
        const matchesLevel = action.payload.level === 'all' || program.program_level === action.payload.level;
        return matchesType && matchesLevel;
      });
    },
    resetFilters: (state) => {
      state.filteredPrograms = state.programs; // Reset to original list
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProgramsThunky.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.filteredPrograms = action.payload; // Initialize filtered programs
    });
  }
});

export const { setFilteredPrograms, resetFilters } = allProgramsSlice.actions;

export default allProgramsSlice.reducer;

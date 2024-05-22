import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Recipe {
  id: number;
  title: string,
  ingredients: string,
  kcal: string,
  protein: string,
  carbs: string,
  fat: string,
  url: string,
  type: string,
  time: string,
  instructions: string
}

interface RecipeState {
  recipies: Recipe[];
}

const initialState: RecipeState = {
  recipies: [],
};

export const getAllRecipiesThunky = createAsyncThunk(
  'getAllRecipies',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/getAllRecipies`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('ОШИБКА ПРИ ПОЛУЧЕНИИ ВСЕХ РЕЦЕПТОВ', error);
      return [];
    }
  }
);

const allRecipiesSlice = createSlice({
  name: 'allRecipies',
  initialState,
  reducers: {
   
    },
  extraReducers: (builder) => {
    builder.addCase(getAllRecipiesThunky.fulfilled, (state, action) => {
      state.recipies = action.payload;
    });
  }
});


export default allRecipiesSlice.reducer;

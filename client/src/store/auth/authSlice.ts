import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  loading: false,
  error: null
};

// Асинхронный экшн для регистрации новых пользователей
export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Асинхронный экшн для входа пользователя
export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData);
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Асинхронный экшн для обновления токена
export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/refresh', {}, { withCredentials: true });
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue('Session expired, please login again');
    }
  }
);

// Асинхронный экшн для выхода пользователя
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      return null;
    } catch (error: any) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;

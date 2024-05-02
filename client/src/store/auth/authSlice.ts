import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Определение структуры состояния аутентификации
interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  user: {
    id: number;
    name: string;
  } | null;
}

// Установка начального состояния для slice аутентификации
const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  loading: false,
  error: null,
  user: null
};

// Асинхронное действие для регистрации нового пользователя
export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
  }
);

// Асинхронное действие для входа пользователя
export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return { accessToken: response.data.accessToken, user: response.data.user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  }
);

// Асинхронное действие для обновления access токена
export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/refresh', {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue('Сессия истекла, пожалуйста, войдите снова');
    }
  }
);

// Асинхронное действие для выхода пользователя
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return null;
    } catch (error: any) {
      return rejectWithValue('Ошибка выхода');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Действие для установки пользователя в стейт
    setUser(state, action: PayloadAction<{ accessToken: string, user: any }>) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
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
      .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; user: { id: number; name: string } }>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
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

// Экспорт действий для использования в компонентах
export const { setUser } = authSlice.actions;

// Экспорт редьюсера для интеграции в хранилище
export default authSlice.reducer;
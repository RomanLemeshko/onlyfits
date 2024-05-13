import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  loading: false,
  error: null,
  user: null
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

interface AuthError {
  message: string;
}

export const register = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: AuthError }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_HOST_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || "Ошибка регистрации" });
      }
      return rejectWithValue({ message: "Сетевая ошибка при регистрации" });
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: AuthError }>(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_HOST_URL}/auth/login`, userData, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || "Ошибка входа" });
      }
      return rejectWithValue({ message: "Сетевая ошибка при входе" });
    }
  }
);

export const refreshAccessToken = createAsyncThunk<string, void, { rejectValue: AuthError }>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_HOST_URL}/auth/refresh`, {}, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || "Ошибка обновления токена" });
      }
      return rejectWithValue({ message: "Сетевая ошибка при обновлении токена" });
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${import.meta.env.VITE_HOST_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || "Ошибка выхода" });
      }
      return rejectWithValue({ message: "Сетевая ошибка при выходе" });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthResponse>) {
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
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<AuthError | undefined, string, never, SerializedError>) => {
        state.error = action.payload?.message || "Неизвестная ошибка регистрации";
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<AuthError | undefined, string, never, SerializedError>) => {
        state.error = action.payload?.message || "Неизвестная ошибка входа";
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
      .addCase(refreshAccessToken.rejected, (state, action: PayloadAction<AuthError | undefined, string, never, SerializedError>) => {
        state.error = action.payload?.message || "Неизвестная ошибка обновления токена";
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<AuthError | undefined, string, never, SerializedError>) => {
        state.error = action.payload?.message || "Неизвестная ошибка выхода";
      });
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

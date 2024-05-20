import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  username: string;
  text: string;
}

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/messages`);
  return response.data;
});

export const clearMessages = createAsyncThunk('messages/clearMessages', async () => {
  await axios.delete(`${import.meta.env.VITE_HOST_URL}/api/messages`);
  return [];
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessagesState: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      .addCase(clearMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { setMessages, addMessage, clearMessagesState } = messagesSlice.actions;

export default messagesSlice.reducer;
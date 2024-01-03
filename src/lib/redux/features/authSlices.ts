import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { io } from 'socket.io-client';
export interface AuthState {
  isLogin?: boolean;
  token?: string | null | unknown;
  error?: string | null | unknown;
  currentUserToken?: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  token: null,
  error: null,
  currentUserToken: null,
};

export const getToken = (loginInfo: { email: string | null; password: string | null }) => {
  const socket = io(process.env.backendUrl as string, { transports: ['websocket'] });
  socket.emit('getToken', loginInfo);
};

export const login = createAsyncThunk('auth/login', async (token: string, thunkAPI) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const url = `${process.env.apiEndpoint}/login`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthState>) {
      state.token = action.payload;
      state.error = null;
      state.currentUserToken = null;
    },
    logout(state) {
      state.token = null;
      state.error = null;
      state.currentUserToken = null;
      state.isLogin = false;
    },
    loginError(state, action: PayloadAction<AuthState>) {
      state.token = null;
      state.error = action.payload.error;
      state.currentUserToken = null;
      state.isLogin = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.currentUserToken = action.payload;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.currentUserToken = null;
      state.isLogin = false;
    });
  },
});

export const { logout, setToken, loginError } = auth.actions;
const { reducer: authReducer } = auth;
export { authReducer };

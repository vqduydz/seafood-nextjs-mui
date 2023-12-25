import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {
  token: string | null | unknown;
  error: string | null | unknown;
}

const initialState: InitialState = { token: null, error: null };

// get token
export const getToken = createAsyncThunk(
  'auth/gettoken',
  async (loginInfo: { email: string; password: string }, thunkAPI) => {
    try {
      const url = `${process.env.apiEndpoint}/gettoken`;
      const response = await axios.post(url, loginInfo);
      const res = response.data;
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
//login

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
    test(state, action: PayloadAction<InitialState>) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.error = null;
    },
    loginError(state, action: PayloadAction<InitialState>) {
      state.token = null;
      state.error = action.payload.error;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.token = null;
      state.error = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { logout, test } = auth.actions;
const { reducer: authReducer } = auth;
export { authReducer };

// Languages

export const languageSlice = createSlice({
  name: 'language',
  initialState: { language: 'vi' },
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});
export const { changeLanguage } = languageSlice.actions;
const { reducer: languageReducer } = languageSlice;
export { languageReducer };

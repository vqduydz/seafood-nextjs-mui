import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
  message?: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  message: null,
};

const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<InitialState>) {
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
  },
});

export const { setLoading } = loading.actions;
const { reducer: loadingReducer } = loading;
export { loadingReducer };

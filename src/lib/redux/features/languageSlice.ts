import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

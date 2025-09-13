import { createSlice } from '@reduxjs/toolkit';

// ===== 1. ĐỊNH NGHĨA TYPES =====
export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  isSystemTheme: boolean;
}

// ===== 2. INITIAL STATE =====
const initialState: ThemeState = {
  theme: 'light',
  isSystemTheme: true,
};

// ===== 3. SLICE CREATION =====
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.isSystemTheme = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      state.isSystemTheme = false;
    },
    setSystemTheme: (state, action) => {
      state.isSystemTheme = action.payload;
    },
    initTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// ===== 4. EXPORT ACTIONS =====
export const { setTheme, toggleTheme, setSystemTheme, initTheme } = themeSlice.actions;

// ===== 5. SELECTORS =====
export const selectTheme = (state: { theme: ThemeState }) => state.theme;
export const selectIsSystemTheme = (state: { theme: ThemeState }) => state.theme.isSystemTheme;
export const selectThemeState = (state: { theme: ThemeState }) => state.theme;

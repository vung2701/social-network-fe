import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { postSlice } from './slices/postSlice';
import { themeSlice } from './slices/themeSlice';

// Tạo store với Redux Toolkit
export const store = configureStore({
  // Kết hợp tất cả reducers
  reducer: {
    auth: authSlice.reducer,    // Quản lý authentication
    posts: postSlice.reducer,   // Quản lý posts
    theme: themeSlice.reducer,  // Quản lý theme
  },
  // Cấu hình middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua một số actions không cần serialize
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  // Bật Redux DevTools trong development
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types để sử dụng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
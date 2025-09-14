import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// Removed vitest import as it's not needed

// Import slices
import { authSlice } from '../store/slices/authSlice';
import { postSlice } from '../store/slices/postSlice';
import { themeSlice } from '../store/slices/themeSlice';

// Create a test store
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      posts: postSlice.reducer,
      theme: themeSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

// Custom render function that includes Redux Provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Mock data for testing
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  avatar: null,
};

export const mockPost = {
  id: '1',
  content: 'This is a test post',
  author: mockUser,
  createdAt: new Date().toISOString(),
  likes: 5,
  comments: [],
  isLiked: false,
};

export const mockComment = {
  id: '1',
  content: 'This is a test comment',
  author: mockUser,
  createdAt: new Date().toISOString(),
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, toggleTheme, setSystemTheme, initTheme, selectThemeState } from '../store/slices/themeSlice';
import type { Theme } from '../store/slices/themeSlice';

// Định nghĩa types cho Theme
export type { Theme } from '../store/slices/themeSlice';

export interface ThemeState {
  theme: Theme;
  isSystemTheme: boolean;
}

export interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSystemTheme: (useSystem: boolean) => void;
}

// Create Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectThemeState);

  // Khởi tạo theme từ localStorage hoặc system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSystemTheme = localStorage.getItem('isSystemTheme') === 'true';
    
    if (savedTheme && !savedSystemTheme) {
      // Sử dụng theme đã lưu
      dispatch(initTheme(savedTheme));
    } else {
      // Sử dụng system theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      dispatch(initTheme(systemTheme));
      dispatch(setSystemTheme(true));
    }
  }, [dispatch]);

  // Lưu theme vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('isSystemTheme', state.isSystemTheme.toString());
    
    // Cập nhật class cho document body
    document.body.className = state.theme;
    
    // Cập nhật meta theme-color cho mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', state.theme === 'dark' ? '#1f1f1f' : '#ffffff');
    }
  }, [state.theme]);

  // Lắng nghe thay đổi system theme
  useEffect(() => {
    if (state.isSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        dispatch(initTheme(e.matches ? 'dark' : 'light'));
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state.isSystemTheme, dispatch]);

  // Handler để set theme cụ thể
  const setThemeHandler = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  // Handler để toggle theme
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  // Handler để bật/tắt system theme
  const setSystemThemeHandler = (useSystem: boolean) => {
    dispatch(setSystemTheme(useSystem));
    
    if (useSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      dispatch(initTheme(systemTheme));
    }
  };

  const contextValue: ThemeContextType = {
    state,
    setTheme: setThemeHandler,
    toggleTheme: toggleThemeHandler,
    setSystemTheme: setSystemThemeHandler,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook để sử dụng ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

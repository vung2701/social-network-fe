import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Định nghĩa types cho Theme
export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  isSystemTheme: boolean;
}

export type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_SYSTEM_THEME'; payload: boolean }
  | { type: 'INIT_THEME'; payload: Theme };

export interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSystemTheme: (useSystem: boolean) => void;
}

// Initial State
const initialState: ThemeState = {
  theme: 'light',
  isSystemTheme: true,
};

// Reducer để quản lý state của theme
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        isSystemTheme: false,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
        isSystemTheme: false,
      };
    case 'SET_SYSTEM_THEME':
      return {
        ...state,
        isSystemTheme: action.payload,
      };
    case 'INIT_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Khởi tạo theme từ localStorage hoặc system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSystemTheme = localStorage.getItem('isSystemTheme') === 'true';
    
    if (savedTheme && !savedSystemTheme) {
      // Sử dụng theme đã lưu
      dispatch({ type: 'INIT_THEME', payload: savedTheme });
    } else {
      // Sử dụng system theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      dispatch({ type: 'INIT_THEME', payload: systemTheme });
      dispatch({ type: 'SET_SYSTEM_THEME', payload: true });
    }
  }, []);

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
        dispatch({ type: 'INIT_THEME', payload: e.matches ? 'dark' : 'light' });
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state.isSystemTheme]);

  // Handler để set theme cụ thể
  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  // Handler để toggle theme
  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  // Handler để bật/tắt system theme
  const setSystemTheme = (useSystem: boolean) => {
    dispatch({ type: 'SET_SYSTEM_THEME', payload: useSystem });
    
    if (useSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      dispatch({ type: 'INIT_THEME', payload: systemTheme });
    }
  };

  const contextValue: ThemeContextType = {
    state,
    setTheme,
    toggleTheme,
    setSystemTheme,
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

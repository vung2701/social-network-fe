import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../types/auth.types';

// ===== 1. ĐỊNH NGHĨA TYPES =====
export interface AuthState {
  user: User | null;           // Thông tin user hiện tại
  isAuthenticated: boolean;    // Trạng thái đăng nhập
  isLoading: boolean;          // Trạng thái loading
  error: string | null;        // Lỗi nếu có
}

// Types cho async thunks
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

// ===== 2. INITIAL STATE =====
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ===== 3. ASYNC THUNKS (Xử lý API calls) =====
// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',  // Action type prefix
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Mock API call - thay thế bằng API thật
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          avatar: null,
        };
        return mockUser;
        
      } else {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Đăng nhập thất bại');
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      // Validation
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Mật khẩu nhập lại không khớp');
      }

      if (credentials.password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        avatar: null,
      };

      return mockUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Đăng ký thất bại');
    }
  }
);

// ===== 4. SLICE CREATION =====
export const authSlice = createSlice({
  name: 'auth',  // Tên slice
  initialState,
  reducers: {
    // ===== SYNCHRONOUS ACTIONS =====
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // ===== ASYNC ACTIONS HANDLERS =====
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

// ===== 5. EXPORT ACTIONS =====
export const { logout, clearError, setUser } = authSlice.actions;

// ===== 6. SELECTORS (Truy xuất state) =====
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

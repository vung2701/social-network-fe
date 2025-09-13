import React, { createContext } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, registerUser, logout, clearError } from '../store/slices/authSlice';
import { selectAuth } from '../store/slices/authSlice';
import type { AuthContextType } from '../types/auth.types';

// Create Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAuth);

  const login = async (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    dispatch(registerUser({ email, password, confirmPassword }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout: logoutHandler,
    clearError: clearErrorHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};



import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, registerUser, logout, clearError } from '../store/slices/authSlice';
import { selectAuth } from '../store/slices/authSlice';
import type { AuthContextType } from '../types/auth.types';

export const useAuth = (): AuthContextType => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAuth);

  const login = async (email: string, password: string) => {
    return dispatch(loginUser({ email, password }));
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    return dispatch(registerUser({ email, password, confirmPassword }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  return {
    state,
    login,
    register,
    logout: logoutHandler,
    clearError: clearErrorHandler,
  };
};

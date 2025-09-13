import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// ===== CUSTOM REDUX HOOKS =====
// Sử dụng thay vì useDispatch thông thường để có type safety
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Sử dụng thay vì useSelector thông thường để có type safety
export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

// ===== CÁCH SỬ DỤNG =====
// Thay vì:
// const dispatch = useDispatch();
// const user = useSelector((state: RootState) => state.auth.user);

// Sử dụng:
// const dispatch = useAppDispatch();
// const user = useAppSelector((state) => state.auth.user);
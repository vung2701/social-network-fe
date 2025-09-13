import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

// ===== REDUX PROVIDER COMPONENT =====
interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

// ===== CÁCH SỬ DỤNG =====
// Wrap toàn bộ app trong main.tsx:
// <ReduxProvider>
//   <App />
// </ReduxProvider>
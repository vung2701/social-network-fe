import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from '../layouts/Layout/Layout';

// Loading component
import { PageLoading } from '../components/Loading/Loading';

// Lazy load pages - chỉ import các page đã tồn tại
const Login = lazy(() => import('../pages/Login/Login'));
const Home = lazy(() => import('../pages/Home/Home'));

// Protected Route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated = false }: ProtectedRouteProps) => {
  // TODO: Implement authentication logic here
  // const isAuthenticated = useAuth(); // Hook để kiểm tra authentication
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route component (redirect to home if already authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const PublicRoute = ({ children, isAuthenticated = false }: PublicRouteProps) => {
  // TODO: Implement authentication logic here
  // const isAuthenticated = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default function AppRouter() {
  // TODO: Replace with actual authentication state
  const isAuthenticated = false; // This should come from your auth context/store
  
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route 
          path="/login" 
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes - With Layout */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Home />} />
          
          {/* TODO: Add more routes here when pages are created */}
          {/* Example:
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          */}
        </Route>
        
        {/* Catch all route - redirect to home */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Suspense>
  );
}

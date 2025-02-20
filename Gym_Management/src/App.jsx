import { useRoutes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext';

import Login from './components/auth/login';
import Register from './components/auth/register';
import Header from './components/header/Navbar';

import Home from './modules/member/index';
import Hero from './modules/user/index';
import Admin from './modules/admin/index';
import Diet from './modules/admin/Diet';
import Fees from './modules/admin/Fees';
import Shop from './modules/admin/Shop';
import Orders from './modules/admin/Orders';

// Protected Route Component
const ProtectedRoute = ({ element, adminOnly }) => {
  const { userLoggedIn, userEmail } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userEmail !== 'admin@gmail.com') {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  const routesArray = [
    { path: '/', element: <Hero /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/home', element: <ProtectedRoute element={<Home />} /> },
    { path: '/admin', element: <ProtectedRoute element={<Admin />} adminOnly /> },
    { path: '/Orders', element: <ProtectedRoute element={<Orders />} adminOnly /> },
    { path: '/diet-plan', element: <ProtectedRoute element={<Diet />} adminOnly /> },
    { path: '/fee-package', element: <ProtectedRoute element={<Fees />} adminOnly /> },
    { path: '/manage-shop', element: <ProtectedRoute element={<Shop />} adminOnly /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ];

  const routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Layout>{routesElement}</Layout>
    </AuthProvider>
  );
}

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col">{children}</div>
    </>
  );
};

export default App;

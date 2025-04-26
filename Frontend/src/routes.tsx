import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import PropertyDetail from '@/pages/PropertyDetail';
import RegisterPage from '@/pages/RegisterPage';
import TransferPage from '@/pages/TransferPage';
import AdminPage from '@/pages/AdminPage';
import { useWeb3 } from '@/contexts/Web3Context';

const Routes = () => {
  const { isConnected } = useWeb3();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'dashboard',
          element: isConnected ? <Dashboard /> : <Navigate to="/" />
        },
        {
          path: 'property/:id',
          element: isConnected ? <PropertyDetail /> : <Navigate to="/" />
        },
        {
          path: 'register',
          element: isConnected ? <RegisterPage /> : <Navigate to="/" />
        },
        {
          path: 'transfer',
          element: isConnected ? <TransferPage /> : <Navigate to="/" />
        },
        {
          path: 'admin',
          element: isConnected ? <AdminPage /> : <Navigate to="/" />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
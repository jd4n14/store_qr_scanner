import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from '../modules/dashboard/HomePage.tsx'
import LoginPage from '../modules/auth/login/LoginPage';
import DashboardLayout from '../shared/layout/dashboard';
import TiendasPage from '../modules/tiendas/TiendasPage.tsx';
import Page404 from '../modules/app/Page404.tsx';

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '/home', element: <HomePage />},
        { path: '/stores', element: <TiendasPage /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    }
  ]);

  return routes;
}
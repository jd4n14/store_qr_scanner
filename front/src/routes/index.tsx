import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from '../modules/dashboard/HomePage.tsx'
import LoginPage from '../modules/auth/login/LoginPage';
import DashboardLayout from '../shared/layout/dashboard';
import TiendasPage from '../modules/tiendas/TiendasPage.tsx';
import Page404 from '../modules/app/Page404.tsx';
import UsuariosPage from '../modules/users/UsersPage.tsx';
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import LogoutPage from "../modules/app/Logout.tsx";

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '/home', element: <ProtectedRoute component={<HomePage />} />},
        { path: '/stores', element: <ProtectedRoute component={<TiendasPage />} /> },
        { path: '/users', element: <ProtectedRoute component={<UsuariosPage />} /> },
        { path: '*', element: <ProtectedRoute component={<Page404 />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'logout',
      element: <LogoutPage />,
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
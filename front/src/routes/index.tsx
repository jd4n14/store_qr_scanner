import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../modules/auth/login/LoginPage';
import DashboardLayout from '../shared/layout/dashboard';

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="" />, index: true },
        { path: 'app', element: <div>hola mundo</div>}
        // { path: 'app', element: <DashboardAppPage /> }
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
  ]);

  return routes;
}
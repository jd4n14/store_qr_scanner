import { Navigate, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import HomePage from "../modules/dashboard/HomePage.tsx";
import LoginPage from "../modules/auth/login/LoginPage";
import DashboardLayout from "../shared/layout/dashboard";
import StorePage from "../modules/store/StorePage.tsx";
import Page404 from "../modules/app/Page404.tsx";
import UsersPage from "../modules/users/UsersPage.tsx";
import LogoutPage from "../modules/app/Logout.tsx";
import VehiclesPage from "../modules/vehicles/VehiclesPage.tsx";
import ReportsPage from "../modules/reports/ReportsPage.tsx";

export default function Router() {
  const routes = useRoutes([
    {
      path: "",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "/home", element: <ProtectedRoute component={<HomePage />} /> },
        { path: "/stores", element: <ProtectedRoute component={<StorePage />} /> },
        { path: "/users", element: <ProtectedRoute component={<UsersPage />} /> },
        { path: "/vehicles", element: <ProtectedRoute component={<VehiclesPage />} /> },
        { path: "/reports", element: <ProtectedRoute component={<ReportsPage />} /> },
        { path: "*", element: <ProtectedRoute component={<Page404 />} /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
  ]);

  return routes;
}

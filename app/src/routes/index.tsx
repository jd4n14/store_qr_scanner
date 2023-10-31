import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import DashboardLayout from "../shared/layout/dashboard";
import Page404 from "../modules/app/Page404.tsx";
import LogoutPage from "../modules/app/Logout.tsx";

const LazyHomePage = lazy(() => import("../modules/dashboard/HomePage.tsx"));
const LazyStorePage = lazy(() => import("../modules/store/StorePage.tsx"));
const LazyUsersPage = lazy(() => import("../modules/users/UsersPage.tsx"));
const LazyVehiclesPage = lazy(() => import("../modules/vehicles/VehiclesPage.tsx"));
const LazyReportsPage = lazy(() => import("../modules/reports/ReportsPage.tsx"));
const LazyLoginPage = lazy(() => import("../modules/auth/login/LoginPage.tsx"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "",
      element: (
        <Suspense>
          <DashboardLayout />
        </Suspense>
      ),
      children: [
        { element: <Navigate to="/home" />, index: true },
        {
          path: "/home",
          element: (
            <Suspense>
              <ProtectedRoute component={<LazyHomePage />} />
            </Suspense>
          ),
        },
        {
          path: "/stores",
          element: (
            <Suspense>
              <ProtectedRoute component={<LazyStorePage />} />
            </Suspense>
          ),
        },
        {
          path: "/users",
          element: (
            <Suspense>
              <ProtectedRoute component={<LazyUsersPage />} />
            </Suspense>
          ),
        },
        {
          path: "/vehicles",
          element: (
            <Suspense>
              <ProtectedRoute component={<LazyVehiclesPage />} />
            </Suspense>
          ),
        },
        {
          path: "/reports",
          element: (
            <Suspense>
              <ProtectedRoute component={<LazyReportsPage />} />
            </Suspense>
          ),
        },
        { path: "*", element: <ProtectedRoute component={<Page404 />} /> },
      ],
    },
    {
      path: "login",
      element: (
        <Suspense>
          <LazyLoginPage />
        </Suspense>
      ),
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

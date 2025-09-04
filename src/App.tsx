import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/app/dashboard"} />;
  if (!isAuthenticated) return <Navigate to={"/auth/login"} />;
}
const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    path: "/auth",
    element: <AuthLayout />,

    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

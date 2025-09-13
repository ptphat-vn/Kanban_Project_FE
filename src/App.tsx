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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Board from "./pages/Board";
import BoardDetailPage from "./pages/BoardDetailPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/app/boards"} />;
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
        children: [
          { path: "boards", element: <Board /> },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "/app/boards/:id",
    element: <DefaultLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ index: true, element: <BoardDetailPage /> }],
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

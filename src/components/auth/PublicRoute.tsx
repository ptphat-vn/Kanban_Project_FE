import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/app/dashboard"} />;
  return <Outlet />;
}

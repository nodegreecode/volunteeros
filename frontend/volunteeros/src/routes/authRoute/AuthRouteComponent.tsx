import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {  useAuth } from "@/features/auth/authHooks.ts";

export default function AuthRouteComponent() {
  const {  user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

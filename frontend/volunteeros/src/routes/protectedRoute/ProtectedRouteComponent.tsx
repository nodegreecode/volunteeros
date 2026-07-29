import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/authHooks.ts";

export default function ProtectedRouteComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

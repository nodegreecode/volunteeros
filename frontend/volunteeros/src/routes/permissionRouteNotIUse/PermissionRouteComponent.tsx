import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/authHooks.ts";
import { type Role } from "@/features/auth/types.ts";

interface RoleRouteProps {
  allowedRoles: Role[];
}

export default function PermissionRouteComponent({
  allowedRoles,
}: RoleRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const hasPermission: boolean = user.roles.some((role: Role) =>
    allowedRoles.includes(role),
  );

  if (!hasPermission) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}

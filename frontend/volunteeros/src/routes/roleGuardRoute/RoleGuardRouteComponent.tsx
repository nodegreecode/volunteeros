import { useAuth } from "@/features/auth/authHooks.ts";
import { Navigate } from "react-router-dom";
import { hasRole } from "@/utils/permissionsResolver.ts";
import type { Role } from "@/shared/types/types.ts";

interface RoleGuardRouteProps {
  allowedRoles: Role[];
  children?: React.ReactNode;
}

export default function RoleGuardRouteComponent({
  allowedRoles,
  children,
}: RoleGuardRouteProps) {
  const { user } = useAuth();

  if (!hasRole(user, allowedRoles[0])) {
    return <Navigate to="/" />;
  }

  return children;
}

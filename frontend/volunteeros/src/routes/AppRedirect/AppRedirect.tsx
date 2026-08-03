
import { Navigate } from "react-router-dom";
import { useProfile } from "@/features/auth/authHooks";
import Loading from "@/components/common/Loading";

export default function AppRedirect() {
    const { data: user, isLoading } = useProfile();

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (user.roles.includes("ROLE_ORGANIZATION")) {
        return <Navigate to="/app/organization" replace />;
    }

    if (user.roles.includes("ROLE_VOLUNTEER")) {
        return <Navigate to="/app/volunteer" replace />;
    }

    if (user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/app/admin" replace />;
    }

    return <Navigate to="/" replace />;
}
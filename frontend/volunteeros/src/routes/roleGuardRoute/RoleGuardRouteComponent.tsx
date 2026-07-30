import Loading from "@/components/common/Loading";
import {Navigate} from "react-router-dom";
import {hasRole} from "@/utils/permissionsResolver.ts";
import type {Role} from "@/shared/types/types.ts";
import {useProfile} from "@/features/auth/authHooks.ts";

interface RoleGuardRouteProps {
    allowedRoles: Role[];
    children?: React.ReactNode;
}

export default function RoleGuardRouteComponent({
                                                    allowedRoles,
                                                    children,
                                                }: RoleGuardRouteProps) {
    const {data: user, isLoading} = useProfile();

    if (isLoading) {
        return <Loading/>;
    }

    if (!user) {
        return <Navigate to="/auth"/>;
    }

    if (!hasRole(user, allowedRoles[0])) {
        return <Navigate to="/"/>;
    }

    return children;
}

import {Navigate, Outlet, useOutletContext} from "react-router-dom";
import {hasRoles} from "@/utils/permissionsResolver.ts";
import type {Role} from "@/shared/types/types.ts";


interface RoleGuardRouteProps {
    allowedRoles: Role[];
    children?: React.ReactNode;
}

export default function RoleGuardRouteComponent({
                                                    allowedRoles,
                                                }: RoleGuardRouteProps) {
    const {user} = useOutletContext();

    if (!hasRoles(user, allowedRoles)) {
        return <Navigate to="/app"/>;
    }

    return <Outlet/>;
}

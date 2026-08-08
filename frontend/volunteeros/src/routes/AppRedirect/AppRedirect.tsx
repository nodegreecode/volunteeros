import {Navigate, useOutletContext} from "react-router-dom";

export default function AppRedirect() {

    const {user} = useOutletContext();

    if (user.roles.includes("ROLE_ORGANIZATION")) {
        return <Navigate to="/app/organization/dashboard" replace/>;
    }

    if (user.roles.includes("ROLE_VOLUNTEER")) {
        return <Navigate to="/app/volunteer/dashboard" replace/>;
    }

    if (user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/app/admin/dashboard" replace/>;
    }

    return <Navigate to="/" replace/>;
}
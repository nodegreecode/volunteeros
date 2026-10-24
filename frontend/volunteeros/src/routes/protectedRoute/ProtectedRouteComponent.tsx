import {Navigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useProfile} from "@/features/users/userHooks.ts";
import Loading from "@/components/common/Loading.tsx";

export default function ProtectedRouteComponent() {

    const {data: user, isLoading} = useProfile();

    if (isLoading) {
        return <Loading/>;
    }

    if (!user) {
        return <Navigate to="/auth" replace/>;
    }

    return <Outlet context={{user}}/>;
}

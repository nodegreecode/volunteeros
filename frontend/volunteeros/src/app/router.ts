import {useRoutes} from "react-router-dom";

import publicRoute from "@/routes/publicRoute/publicRoute.tsx";
import authRoute from "@/routes/authRoute/authRoute.tsx";

import protectedRoute from "@/routes/protectedRoute/protectedRoute.tsx";

export default function Router() {
    const routes = [...publicRoute, ...authRoute, ...protectedRoute];
    return useRoutes(routes);
}

import {useRoutes} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import publicRoute from "@/routes/publicRoute/publicRoute.tsx";
import authRoute from "@/routes/authRoute/authRoute.tsx";

//import protectedRoute from "@/routes/protectedRoute/protectedRoute.tsx";
import protectedRouteNew from "@/routes/protectedRoute/protectedRouteNew.tsx";

/*export default function Router() {
    const routes = [...publicRoute, ...authRoute, ...protectedRouteNew];
    return useRoutes(routes);
}*/

const routes = [
    ...publicRoute, ...authRoute, ...protectedRouteNew
];

export const router = createBrowserRouter(routes);

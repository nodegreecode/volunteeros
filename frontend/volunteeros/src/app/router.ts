import {createBrowserRouter} from "react-router-dom";
import publicRoute from "@/routes/publicRoute/publicRoute.tsx";
import authRoute from "@/routes/authRoute/authRoute.tsx";
import protectedRoute from "@/routes/protectedRoute/protectedRoute.tsx";

const routes = [
    ...publicRoute, ...authRoute, ...protectedRoute
];

export const router = createBrowserRouter(routes);

import {createBrowserRouter} from "react-router-dom";
import publicRoute from "@/routes/publicRoute/publicRoute.tsx";
import authRoute from "@/routes/authRoute/authRoute.tsx";
import protectedRoute from "@/routes/protectedRoute/protectedRoute.tsx";
import AppLayout from "@/layouts/AppLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            ...publicRoute,
            ...authRoute,
            ...protectedRoute
        ]
    }
]);

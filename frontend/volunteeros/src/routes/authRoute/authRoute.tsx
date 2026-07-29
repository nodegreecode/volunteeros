import AuthRouteComponent from "./AuthRouteComponent.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import LoginPage from "@/pages/Authentication/LoginPage.tsx";
import SignUpPage from "@/pages/Authentication/SignUpPage.tsx";
import { Navigate } from "react-router-dom";

export default [
  {
    element: <AuthRouteComponent />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
];

import PublicLayout from "@/layouts/PublicLayout.tsx";
import LandingPage from "@/pages/LandingPage/LandingPage.tsx";

export default [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
];

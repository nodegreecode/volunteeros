import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHomePage from "@/pages/DashboardHomePage/DashboardHomePage.tsx";
import ProtectedRouteComponent from "@/routes/protectedRoute/ProtectedRouteComponent.tsx";
import UserProfilePage from "@/pages/UserProfilePage/UserProfilePage.tsx";
import SkillsPage from "@/pages/SkillsPage/SkillsPage";
import ProjectsPage from "@/pages/ProjectsPage/ProjectsPage.tsx";
import MyOrganizationPage from "@/features/organization/pages/ApplicationsPage/MyOrganizationPage.tsx";
import ParticipationsPage from "@/pages/ParticipationsPage/ParticipationsPage.tsx";
import RoleGuardRouteComponent from "@/routes/roleGuardRoute/RoleGuardRouteComponent.tsx";
import OrganizationsPage from "@/features/admin/OrganizationsPage/OrganizationsPage.tsx";
import OrganizationCreateProject from "@/features/organization/components/OrganizationProjects/OrganizationCreateProject";
import MyProjectsPage from "@/features/volunteer/pages/MyProjectsPage/MyProjectsPage.tsx";
import ModerationPage from "@/features/admin/ModerationPage/ModerationPage.tsx";

export default [
  {
    element: <ProtectedRouteComponent />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHomePage />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "skills",
            element: (
              <RoleGuardRouteComponent allowedRoles={["ROLE_VOLUNTEER"]}>
                <SkillsPage />
              </RoleGuardRouteComponent>
            ),
          },
          {
            path: "projects",
            children: [
              {
                index: true,
                element: <ProjectsPage />,
              },
              {
                path: "create",
                element: (
                  <RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}>
                    <OrganizationCreateProject />
                  </RoleGuardRouteComponent>
                ),
              },
              {
                path: "me-projects",
                element: (
                  <RoleGuardRouteComponent allowedRoles={["ROLE_VOLUNTEER"]}>
                    <MyProjectsPage />
                  </RoleGuardRouteComponent>
                ),
              },
            ],
          },
          {
            path: "organization",
            element: (
              <RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}>
                <MyOrganizationPage />
              </RoleGuardRouteComponent>
            ),
          },
          {
            path: "participants",
            element: (
              <RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}>
                <ParticipationsPage />
              </RoleGuardRouteComponent>
            ),
          },
          {
            path: "organizations",
            element: (
              <RoleGuardRouteComponent allowedRoles={["ROLE_ADMIN"]}>
                <OrganizationsPage />
              </RoleGuardRouteComponent>
            ),
          },
          {
            path: "moderation",
            element: (
              <RoleGuardRouteComponent allowedRoles={["ROLE_ADMIN"]}>
                <ModerationPage />
              </RoleGuardRouteComponent>
            ),
          },
        ],
      },
    ],
  },
];

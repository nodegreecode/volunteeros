import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRouteComponent from "@/routes/protectedRoute/ProtectedRouteComponent.tsx";
import OrganizationDashboardLayout from "@/layouts/OrganizationDashboardLayout.tsx";
import OrganizationOverview from "@/features/organization/pages/OrganizationOverview/OrganizationOverview.tsx";
import OrganizationProjects from "@/features/organization/components/OrganizationProjects/OrganizationProjects.tsx";
import VolunteerOverview from "@/features/volunteer/pages/VolunteerOverview/VolunteerOverview.tsx";
import Participants from "@/features/organization/pages/Participants/Participants.tsx";
import Projects from "@/pages/Projects/Projects.tsx";
import VolunteerDashboardLayout from "@/layouts/VolunteerDashboardLayout.tsx";
import MyProjects from "@/features/volunteer/pages/MyProjects/MyProjects.tsx";
import Skills from "@/features/volunteer/pages/Skills/Skills.tsx";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.tsx";
import AdminOverview from "@/features/admin/pages/AdminOverview/AdminOverview.tsx";
import Organizations from "@/features/admin/pages/Organizations/Organizations.tsx";
import Moderation from "@/features/admin/pages/Moderation/Moderation.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Settings from "@/pages/Settings/Settings.tsx";
import Organization from "@/features/organization/pages/Organization/Organization.tsx";
import RoleGuardRouteComponent from "@/routes/roleGuardRoute/RoleGuardRouteComponent.tsx";

import DashboardHomePage from "@/pages/DashboardHomePage/DashboardHomePage.tsx";
import AllProjects from "@/features/admin/pages/AllProjects/AllProjects.tsx";
import OrganizationCreateProject
    from "@/features/organization/components/OrganizationProjects/OrganizationCreateProject.tsx";

export default [
    {
        element: <ProtectedRouteComponent/>,
        children: [
            {
                path: "/app",
                element: <DashboardLayout/>,
                children: [
                    {
                        index: true,
                        element: <DashboardHomePage/>,
                    },
                    {
                        path: "organization",
                        element: (
                            <RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}/>
                        ),
                        children: [
                            {
                                element: <OrganizationDashboardLayout/>,
                                children: [{
                                    index: true,
                                    element: <OrganizationOverview/>,
                                },
                                    {
                                        path: "organization",
                                        element: <Organization/>,
                                    },
                                    {
                                        path: "projects",
                                        children: [
                                            {index: true, element: <OrganizationProjects/>},
                                            {
                                                path: "create",
                                                element: <OrganizationCreateProject/>
                                            }
                                        ]
                                    }
                                    , {
                                        path: "participants",
                                        element: <Participants/>,
                                    }]
                            }
                        ]
                    },
                    {
                        path: "volunteer",
                        element: (<RoleGuardRouteComponent allowedRoles={["ROLE_VOLUNTEER"]}/>),
                        children: [
                            {
                                element: <VolunteerDashboardLayout/>,
                                children: [
                                    {
                                        index: true,
                                        element: <VolunteerOverview/>,
                                    },
                                    {
                                        path: "projects",
                                        element: <Projects/>,
                                    },
                                    {
                                        path: "my-projects",
                                        element: <MyProjects/>,
                                    }
                                    , {
                                        path: "skills",
                                        element: <Skills/>,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "admin",
                        element: (<RoleGuardRouteComponent allowedRoles={["ROLE_ADMIN"]}/>),
                        children: [
                            {
                                element: <AdminDashboardLayout/>,
                                children: [
                                    {
                                        index: true,
                                        element: <AdminOverview/>,
                                    },
                                    {
                                        path: "organizations",
                                        element: <Organizations/>,
                                    },
                                    {
                                        path: "projects",
                                        element: <AllProjects/>,
                                    }
                                    , {
                                        path: "moderation",
                                        element: <Moderation/>,
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        path: "profile",
                        element: <Profile/>
                    },
                    {
                        path: "settings",
                        element: <Settings/>,
                    }
                ],
            },
        ],
    },
];

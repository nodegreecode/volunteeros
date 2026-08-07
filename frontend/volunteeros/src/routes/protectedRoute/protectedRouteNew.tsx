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
import ContactUsPage from '@/pages/ContactUsPage/ContactUsPage';
import DashboardHomePage from "@/pages/DashboardHomePage/DashboardHomePage.tsx";
import AllProjects from "@/features/admin/pages/AllProjects/AllProjects.tsx";
import OrganizationCreateProject
    from "@/features/organization/components/OrganizationProjects/OrganizationCreateProject.tsx";
import AppRedirect from "@/routes/AppRedirect/AppRedirect.tsx";
import {Navigate} from "react-router-dom";
import CreateOrganizationPage from "@/features/organization/pages/CreateOrganziationPage/CreateOrganizationPage.tsx";

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
                        element: <AppRedirect/>,
                    },
                    {
                        path: "organization",
                        element: (
                            <RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}/>
                        ),
                        children: [
                            {
                                index: true,
                                element: <Navigate to="dashboard" replace/>,
                            },
                            {
                                path: "dashboard",
                                element: <OrganizationOverview/>,
                                handle: {title: "Dashboard"}
                            },
                            {
                                path: "organization",
                                //element: <Organization/>,
                                //handle: {title: "Organization"},
                                children: [
                                    {
                                        index: true,
                                        element: <Organization/>, handle: {title: "Organization"},
                                    },
                                    {
                                        path: "create-organization",
                                        element: <CreateOrganizationPage/>,
                                        handle: {title: "Create Organization"},
                                    }

                                ]
                            },
                            {
                                path: "projects",
                                children: [
                                    {index: true, element: <OrganizationProjects/>, handle: {title: "Projects"}},
                                    {
                                        path: "create",
                                        element: <OrganizationCreateProject/>,
                                        handle: {title: "Create Project"}
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "volunteer",
                        element: (<RoleGuardRouteComponent allowedRoles={["ROLE_VOLUNTEER"]}/>),
                        children: [
                            {
                                index: true,
                                element: <Navigate to="dashboard" replace/>,
                            },
                            {
                                path: "dashboard",
                                element: <VolunteerOverview/>,
                                handle: {title: "Dashboard"}
                            },
                            {
                                path: "projects",
                                element: <Projects/>,
                                handle: {title: "Projects"}
                            },

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
                        element: <Profile/>,
                        handle: {title: "Accoutn Settings"}
                    },
                    {
                        path: "contact",
                        element: <ContactUsPage/>,
                        handle: {title: "Contact Us"}
                    }
                ],
            },
        ],
    },
];

/*
                            {
                                element: <VolunteerDashboardLayout/>,
                                children: [

                                    {
                                        path: "my-projects",
                                        element: <MyProjects/>,
                                    }
                                    , {
                                        path: "skills",
                                        element: <Skills/>,
                                    }
                                ]
                            }*/


/*{
    element: <OrganizationDashboardLayout/>,
        children: [{
    index: true,
    element: <OrganizationOverview/>,
},
    {
        path: "dashboard",
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
},*/
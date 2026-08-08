import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRouteComponent from "@/routes/protectedRoute/ProtectedRouteComponent.tsx";
import OrganizationOverview from "@/features/organization/pages/OrganizationOverview/OrganizationOverview.tsx";
import OrganizationProjects from "@/features/organization/components/OrganizationProjects/OrganizationProjects.tsx";
import VolunteerOverview from "@/features/volunteer/pages/VolunteerOverview/VolunteerOverview.tsx";
import Projects from "@/pages/Projects/Projects.tsx";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout.tsx";
import AdminOverview from "@/features/admin/pages/AdminOverview/AdminOverview.tsx";
import Organizations from "@/features/admin/pages/Organizations/Organizations.tsx";
import Moderation from "@/features/admin/pages/Moderation/Moderation.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Organization from "@/features/organization/pages/Organization/Organization.tsx";
import RoleGuardRouteComponent from "@/routes/roleGuardRoute/RoleGuardRouteComponent.tsx";
import ContactUsPage from '@/pages/ContactUsPage/ContactUsPage';
import OrganizationCreateProject
    from "@/features/organization/components/OrganizationProjects/OrganizationCreateProject.tsx";
import AppRedirect from "@/routes/AppRedirect/AppRedirect.tsx";
import CreateOrganizationPage from "@/features/organization/pages/CreateOrganziationPage/CreateOrganizationPage.tsx";
import AllProjects from "@/features/admin/pages/AllProjects/AllProjects.tsx";
import Skills from "@/features/volunteer/pages/Skills/Skills.tsx";
import PersonalInformation from "@/features/users/components/PersonalInformation/PersonalInformation.tsx";
import AccountAndData from "@/features/users/components/AccountAndData/AccountAndData.tsx";

export default [
    {
        element: <ProtectedRouteComponent/>,
        children: [
            {
                path: "/app",
                children: [
                    {
                        index: true,
                        element: <AppRedirect/>,
                    },
                    {
                        element: <DashboardLayout/>,
                        children: [
                            {
                                element: (<RoleGuardRouteComponent allowedRoles={["ROLE_ORGANIZATION"]}/>),
                                children: [
                                    {
                                        path: "organization",
                                        children: [
                                            {
                                                index: true,
                                                element: <Organization/>,
                                                handle: {title: "Organization"},
                                            },
                                            {
                                                path: "dashboard",
                                                element: <OrganizationOverview/>,
                                                handle: {title: "Dashboard"}
                                            },
                                            {
                                                path: "create-organization",
                                                element: <CreateOrganizationPage/>,
                                                handle: {title: "Create Organization"},
                                            },
                                            {
                                                path: "projects",
                                                children: [
                                                    {
                                                        index: true,
                                                        element: <OrganizationProjects/>,
                                                        handle: {title: "Projects"}
                                                    },
                                                    {
                                                        path: "create",
                                                        element: <OrganizationCreateProject/>,
                                                        handle: {title: "Create Project"}
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                element: (<RoleGuardRouteComponent allowedRoles={["ROLE_VOLUNTEER"]}/>),
                                children: [
                                    {
                                        path: "volunteer",
                                        children: [
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
                                            {
                                                path: "skills",
                                                element: <Skills/>,
                                                handle: {title: "Skills"}
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                element: (<RoleGuardRouteComponent allowedRoles={["ROLE_ADMIN"]}/>),
                                children: [
                                    {
                                        path: "admin",
                                        children: [
                                            {
                                                path: "dashboard",
                                                element: <AdminOverview/>,
                                            },
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
                                    }
                                ]
                            },
                            {
                                path: "profile",
                                element: <Profile/>,
                                handle: {title: "Account Settings"},
                                children:[
                                    {
                                        index: true,
                                        element: <PersonalInformation/>
                                    },
                                    {
                                        path: "account-and-data",
                                        element: <AccountAndData/>
                                    }
                                ]
                            },
                            {
                                path: "contact",
                                element: <ContactUsPage/>,
                                handle: {title: "Contact Us"}
                            }
                        ]
                    },

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
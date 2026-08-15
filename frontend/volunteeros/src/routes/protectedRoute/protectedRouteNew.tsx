import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRouteComponent from "@/routes/protectedRoute/ProtectedRouteComponent.tsx";
import OrganizationOverview from "@/features/organization/pages/OrganizationOverview/OrganizationOverview.tsx";
import OrganizationProjects from "@/features/organization/components/OrganizationProjects/OrganizationProjects.txt";
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
import ProjectDetailsPage from "@/features/organization/pages/ProjectDetailsPage/ProjectDetailsPage.tsx";
import CreateProjectEvent from "@/features/organization/components/CreateProjectEvent/CreateProjectEvent.tsx";
import ProjectLayout from "@/features/organization/components/ProjectLayout/ProjectLayout.tsx";
import ProjectEventLayout from "@/features/organization/components/ProjectEventLayout/ProjectEventLayout.tsx";
import ProjectEventDetailsPage from "@/features/organization/pages/ProjectEventDetailsPage/ProjectEventDetailsPage.tsx";
import ProjectEventInformation
    from "@/features/organization/components/ProjectEventInformation/ProjectEventInformation.tsx";
import ProjectEventRegistration
    from "@/features/organization/components/ProjectEventRegistration/ProjectEventRegistration.tsx";
import {ProjectEventCheckIn} from "@/features/organization/components/ProjectEventCheckIn/ProjectEventCheckIn.tsx";
import Participants from "@/features/organization/pages/Participants/Participants.tsx";
import ProjectsPage from "@/pages/ProjectsPage/ProjectsPage.tsx";
import ProjectsLayout from "@/features/organization/components/ProjectsLayout/ProjectsLayout.tsx";
import OrganizationProjectsOverview
    from "@/features/organization/components/OrganizationProjects/OrganizationProjectsOverview.tsx";
import ProjectsOverviewLayout
    from "@/features/organization/components/ProjectsOverviewLayout/ProjectsOverviewLayout.tsx";
import ProjectDetailsLayout from "@/features/organization/components/ProjectDetailsLayout/ProjectDetailsLayout.tsx";
import ProjectDetails from "@/features/organization/components/ProjectDetails/ProjectDetails.tsx";
import {ProjectParticipants} from "@/features/organization/components/ProjectParticipants/ProjectParticipants.tsx";
import VolunteerProjectsLayout
    from "@/features/volunteer/components/VolunteerProjectsLayout/VolunteerProjectsLayout.tsx";
import MyProjectsLayout from "@/features/volunteer/components/MyProjectsLayout/MyProjectsLayout.tsx";
import MyParticipation from "@/features/volunteer/components/MyParticipation/MyParticipation.tsx";
import ApprovedProjectList from "@/features/volunteer/components/ApprovedProjectList.tsx";
import ApprovedProjectsLayout from "@/features/volunteer/components/ApprovedProjectsLayout/ApprovedProjectsLayout.tsx";
import ProjectDetailsDrawerRoute
    from "@/features/volunteer/components/ProjectDetailsDrawerRoute/ProjectDetailsDrawerRoute.tsx";
import ProjectEvents from "@/features/volunteer/components/ProjectEvents/ProjectEvents.tsx";
import ProjectEventDetails from "@/features/volunteer/components/ProjectEventDetails/ProjectEventDetails.tsx";
import VolunteerProjectDetails
    from "@/features/volunteer/components/VolunteerProjectDetails/VolunteerProjectDetails.tsx";
import MyProjectLayout from "@/features/volunteer/components/MyProjectLayout/MyProjectLayout.tsx";

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
                                                element: <ProjectsLayout/>,
                                                children: [
                                                    {
                                                        element: <ProjectsOverviewLayout/>,
                                                        children: [
                                                            {
                                                                index: true,
                                                                element: <OrganizationProjectsOverview/>,
                                                                handle: {title: "Projects"},
                                                            },
                                                            {
                                                                path: "participants",
                                                                element: <Participants/>,
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        path: "create",
                                                        element: <OrganizationCreateProject/>,
                                                        handle: {title: "Create Project"}
                                                    },
                                                    {
                                                        path: ":id",
                                                        element: <ProjectLayout/>,
                                                        children: [
                                                            {
                                                                element: <ProjectDetailsLayout/>,
                                                                handle: {title: "Project Details"},
                                                                children: [
                                                                    {
                                                                        index: true,
                                                                        element: <ProjectDetails/>,
                                                                    },
                                                                    {
                                                                        path: "participants",
                                                                        element: <ProjectParticipants/>
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                path: "create-event",
                                                                element: <CreateProjectEvent/>,
                                                                handle: {title: "Create Event"}
                                                            },
                                                            {
                                                                path: "participants",
                                                                element: <Participants/>,
                                                                handle: {title: "Project Participants"}
                                                            },
                                                            {
                                                                path: "events",
                                                                element: <ProjectEventLayout/>,
                                                                handle: {title: "All Events"},
                                                                children: [
                                                                    {
                                                                        path: ":id",
                                                                        element: <ProjectEventDetailsPage/>,
                                                                        handle: {title: "Project Event Details"},
                                                                        children: [
                                                                            {
                                                                                index: true,
                                                                                element: <ProjectEventInformation/>,
                                                                                handle: {title: "Project Event Information"}
                                                                            },
                                                                            {
                                                                                path: "registration",
                                                                                element: <ProjectEventRegistration/>,
                                                                                handle: {title: "Project Event Registration"}

                                                                            },
                                                                            {
                                                                                path: "check-in",
                                                                                element: <ProjectEventCheckIn/>,
                                                                                handle: {title: "Project Event Check In"}
                                                                            }
                                                                        ]
                                                                    }
                                                                ]

                                                            },
                                                        ]


                                                    },
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
                                                handle: {title: "Browse Projects"},
                                                children: [
                                                    {
                                                        index: true,
                                                    },
                                                ]
                                            },
                                            {
                                                path: "my-projects",
                                                element: <MyProjectsLayout/>,
                                                handle: {title: "My Projects"},
                                                children: [
                                                    {
                                                        index: true,
                                                        element: <ApprovedProjectList/>
                                                    },
                                                    {
                                                        path: "participation",
                                                        element: <MyParticipation/>
                                                    },
                                                    {
                                                        path: ":projectId",
                                                        element: <MyProjectLayout/>,
                                                        children: [
                                                            {
                                                                index: true,
                                                                element: <VolunteerProjectDetails/>,
                                                            },
                                                            {
                                                                path: "project-events",
                                                                element: <ProjectEventLayout/>,

                                                                children: [
                                                                    {
                                                                        index: true,
                                                                        element: <ProjectEvents/>,
                                                                    },
                                                                    {
                                                                        path: ":projectEventId",
                                                                        element: <ProjectEventDetails/>,
                                                                    }
                                                                ]

                                                            }
                                                        ]
                                                    },

                                                ]
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
                                children: [
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
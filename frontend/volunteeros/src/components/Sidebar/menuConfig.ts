export const menuConfig = {
    ROLE_ORGANIZATION: [
        {
            label: "Dashboard",
            path: "/app/organization/dashboard",
        },
        {
            label: "Organization",
            path: "/app/organization",
        },
        {
            label: "Projects",
            path: "/app/organization/projects",
        },
    ],

    ROLE_VOLUNTEER: [
        {
            label: "Dashboard",
            path: "/app/volunteer/dashboard",
        },
        {
            label: "Discover Opportunities",
            path: "/app/volunteer/projects",
        },
        {
            label: "My Projects",
            path: "/app/volunteer/my-projects",
        },
        {
            label: "Skills",
            path: "/app/volunteer/skills",
        },
    ],

    ROLE_ADMIN: [
        {
            label: "Dashboard",
            path: "/app/admin",
        },
        {
            label: "Organizations",
            path: "/app/admin/organizations",
        },
        {
            label: "Users",
            path: "/app/admin/users",
        },
        {
            label: "Moderation",
            path: "/app/admin/moderation",
        },
    ],
};

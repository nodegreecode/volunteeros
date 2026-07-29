export const menuConfig = {
  ROLE_ORGANIZATION: [
    {
      label: "Home",
      path: "/dashboard",
    },
    {
      label: "My Organization",
      path: "/dashboard/organization",
    },
    {
      label: "My Projects",
      path: "/dashboard/projects",
    },
    {
      label: "Participants",
      path: "/dashboard/participants",
    },
    {
      label: "Setting",
      path: "/dashboard/profile",
    },
  ],

  ROLE_VOLUNTEER: [
    {
      label: "Home",
      path: "/dashboard",
    },
    {
      label: "Browse Projects",
      path: "/dashboard/projects",
    },
    {
      label: "My Projects",
      path: "/dashboard/projects/me-projects",
    },
    {
      label: "My Skills",
      path: "/dashboard/skills",
    },
    {
      label: "Settings",
      path: "/dashboard/profile",
    },
  ],

  ROLE_ADMIN: [
    {
      label: "Home",
      path: "/dashboard",
    },
    {
      label: "Organizations",
      path: "/dashboard/organizations",
    },
    {
      label: "Projects",
      path: "/dashboard/projects",
    },
    {
      label: "Moderation",
      path: "/dashboard/moderation",
    },
    {
      label: "Settings",
      path: "/dashboard/profile",
    },
  ],
};

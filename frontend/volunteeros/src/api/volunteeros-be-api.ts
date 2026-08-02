/* BASE */
export const BASE_URL = "https://api.volunteer-os.com";

export const AuthUrls = {
    signup: BASE_URL + "/api/auth/register",
    login: BASE_URL + "/api/auth/login",
    logout: BASE_URL + "/api/auth/logout",
    profile: BASE_URL + "/api/me/profile",
    refresh: BASE_URL + "/api/auth/refresh",
} as const;

export const OrganizationEndpoints = {
    organization: BASE_URL + "/api/me/organization",
    application: BASE_URL + "/api/me/application",
    applications: BASE_URL + "/api/organizations/applications",
    applicationsByUser: BASE_URL + "/api/organizations/{userId}/applications",
    applicationStatus: (applicationId: number) =>
        `${BASE_URL}/api/organizations/applications/${applicationId}/status`,
    organizations: BASE_URL + "/api/organizations",
    organizationEdit: (organizationId: number) =>
        `${BASE_URL}/api/organizations/${organizationId}`,
    myProjects: BASE_URL + "/api/me/projects",
    createProject: (organizationId: number) =>
        `${BASE_URL}/api/projects/${organizationId}`,
    activeProjects: BASE_URL + "/api/projects/active",
    allProjects: BASE_URL + "/api/projects",
    allPendingModerationProjects: BASE_URL + "/api/projects/pending-moderation",
    activeProjectStatus: (projectId: number) =>
        `${BASE_URL}/api/projects/${projectId}/active`,
    cancelProjectStatus: (projectId: number) =>
        `${BASE_URL}/api/projects/${projectId}/cancel`,
    participationStatus: (participationId: number) =>
        `${BASE_URL}/api/projects/participants/${participationId}/status`,
    adminSsePendingProjects: BASE_URL + "/api/admin/events",
    editProject: (projectId: number) => `${BASE_URL}/api/projects/${projectId}`,
    adminDatabaseStatus: BASE_URL + "/api/admin/monitoring/database",
} as const;

export const VolunteerEndpoints = {
    register: BASE_URL + "/volunteers/register",
    apply: (projectId: number) =>
        `${BASE_URL}/api/projects/${projectId}/participants`,
    myParticipation: BASE_URL + "/api/me/participations",
    myParticipants: BASE_URL + "/api/me/participants",
    withdrawParticipation: (participationId: number) =>
        `${BASE_URL}/api/projects/participants/${participationId}/withdraw`,
    myProjects: BASE_URL + "/api/me/projects",
} as const;

export const ProjectUrls = {} as const;

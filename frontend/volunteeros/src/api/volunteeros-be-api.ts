/* BASE */
export const BASE_URL = "https://api.volunteer-os.com";

export const AuthUrls = {
    signup: BASE_URL + "/api/auth/register",
    login: BASE_URL + "/api/auth/login",
    logout: BASE_URL + "/api/auth/logout",
    profile: BASE_URL + "/api/users/profile",
    refresh: BASE_URL + "/api/auth/refresh",
} as const;


export const UsersUrls = {
    profile: BASE_URL + "/api/users/profile",
    editProfile: BASE_URL + "/api/users/profile",
    uploadAvatar: BASE_URL + "/api/users/image",
}

export const OrganizationEndpoints = {
    organization: BASE_URL + "/api/organizations",
    application: BASE_URL + "/api/applications",
    applications: BASE_URL + "/api/applications/all",
    applicationsByUser: BASE_URL + "/api/applications/{userId}",
    applicationStatus: (applicationId: number) =>
        `${BASE_URL}/api/organizations/applications/${applicationId}/status`,
    organizations: BASE_URL + "/api/organizations/all",
    organizationEdit: (organizationId: number) =>
        `${BASE_URL}/api/organizations/${organizationId}`,
    myProjects: BASE_URL + "/api/projects",
    createProject: (organizationId: number) =>
        `${BASE_URL}/api/projects/${organizationId}`,
    activeProjects: BASE_URL + "/api/projects/active",
    singleProject: (projectId: number) => BASE_URL + `/api/projects/${projectId}`,
    allProjects: BASE_URL + "/api/projects/all",
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
    uploadLogo: BASE_URL + "/api/organizations/image",
    uploadProjectImage: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/image`,
    createProjectEvent: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events`,
    allProjectEvents: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events`,
    singleProjectEvent: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}`,
    editProjectEvent: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}`,
    cancelProjectEvent: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}/cancel`,
    completeProjectEvent: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}/complete`,
    allProjectEventRegistrations: (projectEventId: number) => `${BASE_URL}/api/project-events/${projectEventId}/registrations`,
    startCheckIn: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}/start-check-in`,
    checkInVolunteer: BASE_URL + "/api/event-registrations/check-in",
    startProjectEvent: (projectEventId: number) => BASE_URL + `/api/project-events/${projectEventId}/start`,
    participants: BASE_URL + "/api/project-participations/organization",
    projectParticipants: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/participants`,
} as const;

export const VolunteerEndpoints = {
    register: BASE_URL + "/volunteers/register",
    apply: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/participants`,
    myParticipation: BASE_URL + "/api/project-participations/volunteer",
    withdrawParticipation: (participationId: number) => `${BASE_URL}/api/projects/participants/${participationId}/withdraw`,
    myProjects: BASE_URL + "/api/projects/me",
    projectEvents: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events`,
    applyForEvent: (projectEventId: number) => `${BASE_URL}/api/project-events/${projectEventId}/registrations`,
    singleProjectEvent: (projectEventId: number) => `${BASE_URL}/api/project-events/${projectEventId}`,
    singleProjectEventRegistration: (projectEventId: number) => `${BASE_URL}/api/event-registrations/${projectEventId}`,
    fetchRegistrationQrCode: (registrationId: number) => `${BASE_URL}/api/event-registrations/${registrationId}/qr`,
    withdrawEventParticipation: (registrationId: number) => `${BASE_URL}/api/event-registrations/${registrationId}/cancel`,
    nextProjects: (params) => `${BASE_URL}/api/projects/active-next?${params}`,
    previousProjects: (params) => `${BASE_URL}/api/projects/active-next?${params}`,
} as const;

export const ProjectUrls = {} as const;

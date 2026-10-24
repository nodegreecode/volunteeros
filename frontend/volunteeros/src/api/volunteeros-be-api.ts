/* BASE */
export const BASE_URL = "https://api.volunteer-os.com";

export const AuthUrls = {
    signup: BASE_URL + "/api/auth/register",
    login: BASE_URL + "/api/auth/login",
    logout: BASE_URL + "/api/auth/logout",
    refresh: BASE_URL + "/api/auth/refresh",
} as const;

export const UserUrls = {
    profile: BASE_URL + "/api/users/profile",
    uploadAvatar: BASE_URL + "/api/users/image",
} as const;

export const VolunteerSkillsUrls = {
    createSkill: BASE_URL + "/api/skills",
    getSkills: BASE_URL + "/api/skills",
    updateSkill: (skillId: number) => `${BASE_URL}/api/skills/${skillId}`,
    deleteSkill: (skillId: number) => `${BASE_URL}/api/skills/${skillId}`,
} as const;

export const NotificationUrls = {
    getAll: BASE_URL + "/api/notifications",
    getAllUnread: BASE_URL + "/api/notifications/unread",
    getUnreadCount: BASE_URL + "/api/notifications/unread-count",
    markAsRead: (notificationId: number) => `${BASE_URL}/api/notifications/${notificationId}/read`,
} as const;

export const OrganizationApplicationUrls = {
    createOrganizationApplication: BASE_URL + "/api/applications",
    getOrganizationApplication: BASE_URL + "/api/applications/me",
    approveOrganizationApplication: (applicationId: number) => `${BASE_URL}/api/applications/${applicationId}/approve`,
    rejectOrganizationApplication: (applicationId: number) => `${BASE_URL}/api/applications/${applicationId}/reject`,
    getOrganizationApplications: BASE_URL + "/api/applications",
    getOrganizationApplicationByUserId: (userId: number) => `${BASE_URL}/api/applications/${userId}`,
} as const;

export const OrganizationUrls = {
    getAllOrganizations: BASE_URL + "/api/organizations",
    getOrganization: BASE_URL + "/api/organizations/me",
    updateOrganization: BASE_URL + "/api/organizations/me",
    uploadOrganizationLogo: BASE_URL + "/api/organizations/me/image",
} as const;

export const ProjectUrls = {
    createProject: BASE_URL + "/api/projects",
    updateProject: (projectId: number) => `${BASE_URL}/api/projects/${projectId}`,
    uploadProjectImage: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/image`,
    createProjectParticipation: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/participation`,
    getProjectParticipants: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/participants`,
    getProjects: BASE_URL + "/api/projects/me",
    getProjectById: (projectId: number) => `${BASE_URL}/api/projects/${projectId}`,
    getAllProjects: BASE_URL + "/api/projects",
    getPendingModerationProjects: BASE_URL + "/api/projects/pending-moderation",
    activateProject: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/activate`,
    completeProject: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/complete`,
    cancelProject: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/cancel`,
    getActiveProjects: (params) => `${BASE_URL}/api/projects/active?${params}`,
    searchProjectsByTitle: (params) => `${BASE_URL}/api/projects/search?${params}`,
    createProjectEvent: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events`,
    getAllProjectEvents: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events`,
    getUpcomingProjectEvents: (projectId: number) => `${BASE_URL}/api/projects/${projectId}/events/upcoming`,
} as const;

export const ProjectParticipationUrls = {
    updateProjectParticipationStatus: (participationId: number) => `${BASE_URL}/api/project-participations/${participationId}/status`,
    getProjectParticipantsApplications: BASE_URL + "/api/project-participations/organization",
    withdrawProjectParticipation: (participationId: number) => `${BASE_URL}/api/project-participations/${participationId}/withdraw`,
    getProjectParticipationApplications: BASE_URL + "/api/project-participations/volunteer",
} as const;

export const ProjectEventUrls = {
    getProjectEventById: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}`,
    updateProjectEvent: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}`,
    startCheckIn: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/start-check-in"`,
    startProjectEvent: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/start`,
    cancelProjectEvent: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/cancel`,
    completeProjectEvent: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/complete`,
    register: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/registrations`,
    getProjectEventRegistrationByEventId: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/registration`,
    getProjectEventRegistrationsByEventId: (eventId: number) => `${BASE_URL}/api/project-events/${eventId}/registrations`,
} as const;

export const ProjectEventRegistrationUrls = {
    getProjectEventRegistrationQrCodeByRegistrationId: (registrationId: number) => `${BASE_URL}/api/event-registrations/${registrationId}/qr`,
    cancelProjectEventRegistration: (registrationId: number) => `${BASE_URL}/api/event-registrations/${registrationId}/cancel`,
    markProjectEventRegistrationAsNoShow: (registrationId: number) => `${BASE_URL}/api/event-registrations/${registrationId}/no-show`,
    markProjectEventRegistrationAsCheckIn: BASE_URL + "/api/event-registrations/check-in",
} as const;

export const ModerationUrls = {
    getAllModerationCases: BASE_URL + "/api/moderations/cases",
    updateModerationCaseStatus: (caseId: number) => `${BASE_URL}/api/moderations/cases/${caseId}/status`,
} as const;

export const NotificationSse = {
    getDataBaseMetrics: BASE_URL + "/api/admin/monitoring/database",
} as const;



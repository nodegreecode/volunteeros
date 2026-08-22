import {OrganizationEndpoints} from "@/api/volunteeros-be-api.ts";
import type {ApplicationStatus} from "@/features/admin/adminTypes.ts";
import type {
    OrganizationUpdateRequestDto,
    ProjectCreateResponseDto,
} from "@/features/organization/orgTypes.ts";
import {apiFetch} from "@/features/auth/authApi.ts";

export interface ApplicationRequestDto {
    userId: number;
    organizationForm: string;
    organizationName: string;
    description: string;
    memberRole: string;
}

export type ProjectCreateRequest = {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
};

type CreateProjectParams = {
    organizationId: number;
    values: ProjectCreateRequest;
};

type UpdateOrganizationParams = {
    organizationId: number;
    values: OrganizationUpdateRequestDto;
};

type UpdateProjectParams = {
    projectId: number;
    values: ProjectEditRequestDto;
};

type UpdateProjectEventParams = {
    projectEventId: number;
    values: ProjectEventEditRequestDto;
};

export interface ProjectEditRequestDto {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
}

export interface ProjectEventEditRequestDto {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
}

export interface OrganizationResponseDto {
    id: string;
    ownerId: string;
    orgForm: string;
    orgName: string;
    registrationNumber: string;
    description: string;
    website: string;
    registrationCountry: string;
    city: string;
    street: string;
    phone: string;
    email: string;
    avatar: OrganizationAvatar | null;
    applicationsCount: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface OrganizationAvatar {
    contentType: string;
    id: number;
    originalFilename: string;
    publicId: string;
    size: number;
    uploadedAt: string;
    url: string;
}

/**
 *
 */
export async function fetchOrganization() {
    const organizationResponse = await apiFetch(OrganizationEndpoints.organization, {
        credentials: "include",
    });

    if (!organizationResponse.ok) {
        throw new Error("Failed to load organization. Organization does not exist");
    }

    const data = await organizationResponse.json();

    return data.data;
}

/**
 *
 */
export async function fetchApplication() {
    const applicationResponse = await apiFetch(OrganizationEndpoints.application, {
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to load application. Application does not exist");
    }

    const data = await applicationResponse.json();

    return data.data;
}

/**
 *
 * @param values
 */
export async function postApplication(values: ApplicationRequestDto) {
    const applicationResponse = await fetch(OrganizationEndpoints.application, {
        method: "POST",
        headers: {"content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for organization ");
    }

    return applicationResponse.json();
}

/**
 * Edit organization information
 */
export async function updateOrganization({
                                             organizationId,
                                             values,
                                         }: UpdateOrganizationParams) {
    const response = await fetch(
        OrganizationEndpoints.organizationEdit(organizationId),
        {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to update organization");
    }

    return response.json();
}

/**
 *
 */
export async function fetchOrganizationProjects(): Promise<
    ProjectCreateResponseDto[]
> {
    const response = await fetch(OrganizationEndpoints.myProjects, {
        method: "GET",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch organization projects");
    }

    return response.json();
}

/**
 *
 */
export async function createProject({
                                        organizationId,
                                        values,
                                    }: CreateProjectParams) {
    const response = await fetch(
        OrganizationEndpoints.createProject(organizationId),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to create project");
    }

    return await response.json();
}

/**
 * Update participation status
 */
export async function updateParticipationStatus({participationId, status}) {
    const participationStatusResponse = await fetch(
        OrganizationEndpoints.participationStatus(participationId),
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({status}),
        },
    );

    if (!participationStatusResponse.ok) {
        throw new Error("Participation status update failed");
    }

    return participationStatusResponse.text();
}

/**
 * Edit project information
 */
export async function updateProject({projectId, values,}: UpdateProjectParams) {
    const response = await fetch(OrganizationEndpoints.editProject(projectId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error("Failed to update project");
    }

    return response.json();
}

export async function uploadLogo(image) {

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(OrganizationEndpoints.uploadLogo,
        {
            method: "POST",
            credentials: "include",
            body: formData
        });

    if (!response.ok) {
        throw new Error("Failed to upload logo");
    }
}


export async function fetchSingleProjectById(projectId: number) {
    const response = await fetch(OrganizationEndpoints.singleProject(projectId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return await response.json();
}

export async function uploadProjectImage({projectId, image}) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(OrganizationEndpoints.uploadProjectImage(projectId), {
        method: "POST",
        credentials: "include",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }
}

export async function createProjectEvent({projectId, values}: CreateProjectParams) {
    const response = await fetch(
        OrganizationEndpoints.createProjectEvent(projectId),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to create project event");
    }

    return await response.json();
}


export async function fetchProjectEvents(projectId: number) {
    const response = await fetch(OrganizationEndpoints.allProjectEvents(projectId), {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch organization projects");
    }

    return response.json();
}

export async function fetchSingleProjectEventById(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.singleProjectEvent(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return response.json();
}

export async function updateProjectEvent({projectEventId, values,}: UpdateProjectEventParams) {
    const response = await fetch(OrganizationEndpoints.editProjectEvent(projectEventId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error("Failed to update project event");
    }

    return response.json();
}

export async function cancelProjectEvent(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.cancelProjectEvent(projectEventId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to update project event");
    }

    return response.json();
}

export async function fetchProjectEventRegistrations(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.allProjectEventRegistrations(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return response.json();
}


export async function startCheckIn(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.startCheckIn(projectEventId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to update project event");
    }

    return response.json();
}

export async function checkInVolunteer(values) {
    const response = await fetch(
        OrganizationEndpoints.checkInVolunteer,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to check in volunteer");
    }

    return await response.json();
}

export async function startProjectEvent(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.startProjectEvent(projectEventId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to update project event");
    }

    return response.json();
}

export async function completeProjectEvent(projectEventId: number) {
    const response = await fetch(OrganizationEndpoints.completeProjectEvent(projectEventId), {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to complete project event");
    }

    return response.json();
}

export async function fetchProjectParticipants(projectId: number) {
    const response = await fetch(OrganizationEndpoints.projectParticipants(projectId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return response.json();
}
import {ProjectUrls} from "@/api/volunteeros-be-api.ts";
import type {ProjectCreateResponseDto} from "@/features/organization/orgTypes.ts";


type ApplyForProjectParams = {
    projectId: number;
};

export type ProjectCreateRequest = {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
};

type CreateProjectParams = {
    values: ProjectCreateRequest;
};

type UpdateProjectParams = {
    projectId: number;
    values: ProjectEditRequestDto;
};

export interface ProjectEditRequestDto {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
}

type ActivateProjectParams = {
    projectId: number;
};

/**
 *
 */
export async function createProject({values}: CreateProjectParams) {
    const response = await fetch(ProjectUrls.createProject,
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
 * Edit project information
 */
export async function updateProject({projectId, values,}: UpdateProjectParams) {
    const response = await fetch(ProjectUrls.updateProject(projectId), {
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


export async function uploadProjectImage({projectId, image}) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(ProjectUrls.uploadProjectImage(projectId), {
        method: "POST",
        credentials: "include",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }
}

export async function fetchSingleProjectById(projectId: number) {
    const response = await fetch(ProjectUrls.getProjectById(projectId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return await response.json();
}

export async function fetchProjectParticipants(projectId: number) {
    const response = await fetch(ProjectUrls.getProjectParticipants(projectId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return response.json();
}

/**
 *  Fetch all  projects
 */
export async function fetchAllProjects() {
    const projectsResponse = await fetch(ProjectUrls.getAllProjects, {
        method: "GET",
        credentials: "include",
    });

    if (!projectsResponse.ok) {
        throw new Error("Failed to load projects.");
    }

    return projectsResponse.json();
}

/**
 *  Fetch all  pending moderation projects
 */
export async function fetchAllPendingProjects() {
    const projectsResponse = await fetch(ProjectUrls.getPendingModerationProjects, {
        method: "GET",
        credentials: "include",
    });

    if (!projectsResponse.ok) {
        throw new Error("Failed to load pending projects.");
    }

    return projectsResponse.json();
}

/**
 * Activate project
 */
export async function activateProject({projectId}: ActivateProjectParams) {
    const projectStatusResponse = await fetch(
        ProjectUrls.activateProject(projectId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!projectStatusResponse.ok) {
        throw new Error("Project status update failed");
    }

    return projectStatusResponse.json();
}

/**
 * Cancel project
 */
export async function cancelProject({projectId}: ActivateProjectParams) {
    const projectStatusResponse = await fetch(ProjectUrls.cancelProject(projectId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!projectStatusResponse.ok) {
        throw new Error("Project status update failed");
    }

    return projectStatusResponse.json();
}

export async function fetchNextProjects(direction: "NEXT" | "PREVIOUS", cursor: string | null, limit: number) {

    const params = new URLSearchParams({limit: String(limit), direction: direction});

    if (cursor) {
        params.set("cursor", cursor);
    }

    const response = await fetch(ProjectUrls.getActiveProjects(params), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load projects page");
    }

    return response.json();
}

export async function searchProjectsByTitle(title: string, cursor: string | null, limit: number, direction: "NEXT" | "PREVIOUS") {

    const params = new URLSearchParams({title: title, limit: String(limit), direction: direction});

    if (cursor) {
        params.set("cursor", cursor);
    }

    const response = await fetch(ProjectUrls.searchProjectsByTitle(params), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("No projects find for the title: " + title);
    }

    return response.json();
}

export async function fetchProjectEvents(projectId: number) {
    const response = await fetch(ProjectUrls.getAllProjectEvents(projectId), {
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

export async function createProjectEvent({projectId, values}: CreateProjectParams) {
    const response = await fetch(
        ProjectUrls.createProjectEvent(projectId),
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

/**
 *
 * @param values
 */
export async function applyForProject({projectId}: ApplyForProjectParams) {
    const applicationResponse = await fetch(ProjectUrls.createProjectParticipation(projectId), {
        method: "POST",
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for project");
    }

    return applicationResponse.json();
}

export async function fetchMyProjects() {
    const response = await fetch(ProjectUrls.getProjects, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    return response.json();
}

/**
 *
 */
export async function fetchOrganizationProjects(): Promise<ProjectCreateResponseDto[]> {
    const response = await fetch(ProjectUrls.getProjects, {
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
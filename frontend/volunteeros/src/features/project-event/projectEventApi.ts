import {
    ProjectEventUrls
} from "@/api/volunteeros-be-api.ts";

type UpdateProjectEventParams = {
    projectEventId: number;
    values: ProjectEventEditRequestDto;
};

export interface ProjectEventEditRequestDto {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
}

export async function applyForEvent(projectEventId: number) {
    const applicationResponse = await fetch(ProjectEventUrls.register(projectEventId), {
        method: "POST",
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for event");
    }

    return applicationResponse.json();
}

export async function fetchSingleProjectEvent(projectEventId: number) {
    const response = await fetch(ProjectEventUrls.getProjectEventById(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load project event: " + projectEventId);
    }

    return response.json();
}

export async function fetchProjectEventRegistration(projectEventId: number) {
    const response = await fetch(ProjectEventUrls.getProjectEventRegistrationByEventId(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load project event registration: " + projectEventId);
    }

    const data = await response.json();

    return  data.data;
}

export async function updateProjectEvent({projectEventId, values,}: UpdateProjectEventParams) {
    const response = await fetch(ProjectEventUrls.updateProjectEvent(projectEventId), {
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
    const response = await fetch(ProjectEventUrls.cancelProjectEvent(projectEventId), {
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
    const response = await fetch(ProjectEventUrls.completeProjectEvent(projectEventId), {
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

export async function fetchProjectEventRegistrations(projectEventId: number) {
    const response = await fetch(ProjectEventUrls.getProjectEventRegistrationsByEventId(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch single project");
    }

    return response.json();
}

export async function startCheckIn(projectEventId: number) {
    const response = await fetch(ProjectEventUrls.startCheckIn(projectEventId), {
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

export async function startProjectEvent(projectEventId: number) {
    const response = await fetch(ProjectEventUrls.startProjectEvent(projectEventId), {
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
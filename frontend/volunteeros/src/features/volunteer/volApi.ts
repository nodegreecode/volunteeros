import {OrganizationEndpoints} from "@/api/volunteeros-be-api.ts";
import {VolunteerEndpoints} from "@/api/volunteeros-be-api.ts";
import type {ProjectResponseDto} from "@/features/volunteer/volHooks.ts";
import {string} from "yup";

type ApplyForProjectParams = {
    projectId: number;
};

type WithdrawParticipationParams = {
    participationId: number;
};

/**
 *
 */
export async function fetchAllActiveProjects(): Promise<ProjectResponseDto[]> {
    const activeProjectsResponse = await fetch(
        OrganizationEndpoints.activeProjects,
        {
            method: "GET",
            credentials: "include",
        },
    );

    if (!activeProjectsResponse.ok) {
        throw new Error("Failed to load projects ");
    }

    return activeProjectsResponse.json();
}

/**
 *
 * @param values
 */
export async function applyForProject({projectId}: ApplyForProjectParams) {
    const applicationResponse = await fetch(VolunteerEndpoints.apply(projectId), {
        method: "POST",
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for project");
    }

    return applicationResponse.json();
}

export async function myParticipations() {
    const participationsResponse = await fetch(
        VolunteerEndpoints.myParticipation,
        {
            method: "GET",
            credentials: "include",
        },
    );

    if (!participationsResponse.ok) {
        throw new Error("Failed to find participations");
    }

    return participationsResponse.json();
}

export async function myParticipants() {
    const participantsResponse = await fetch(OrganizationEndpoints.participants, {
        method: "GET",
        credentials: "include",
    });

    if (!participantsResponse.ok) {
        throw new Error("Failed to find participants");
    }

    return participantsResponse.json();
}

export async function withdrawParticipation({
                                                participationId,
                                            }: WithdrawParticipationParams) {
    const withdrawResponse = await fetch(
        VolunteerEndpoints.withdrawParticipation(participationId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!withdrawResponse.ok) {
        throw new Error("Failed to withdraw participation");
    }
    return withdrawResponse.json();
}

/**
 *
 */
export async function myProjects() {
    const myProjectsResponse = await fetch(VolunteerEndpoints.myProjects, {
        method: "GET",
        credentials: "include",
    });

    if (!myProjectsResponse.ok) {
        throw new Error("Failed to load projects");
    }

    return myProjectsResponse.json();
}

export async function fetchProjectEvents(projectId: number) {
    const myProjectsResponse = await fetch(VolunteerEndpoints.projectEvents(projectId), {
        method: "GET",
        credentials: "include",
    });

    if (!myProjectsResponse.ok) {
        throw new Error("Failed to load projects");
    }

    return myProjectsResponse.json();
}


export async function applyForEvent(projectEventId: number) {
    const applicationResponse = await fetch(VolunteerEndpoints.applyForEvent(projectEventId), {
        method: "POST",
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for event");
    }

    return applicationResponse.json();
}

export async function fetchSingleProjectEvent(projectEventId: number) {
    const response = await fetch(VolunteerEndpoints.singleProjectEvent(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load project event: " + projectEventId);
    }

    return response.json();
}

export async function fetchSingleProjectEventRegistration(projectEventId: number) {
    const response = await fetch(VolunteerEndpoints.singleProjectEventRegistration(projectEventId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load project event registration: " + projectEventId);
    }

    const data = await response.json();

    return  data.data;
}

export async function fetchRegistrationQrCode(registrationId: number) {
    const response = await fetch(VolunteerEndpoints.fetchRegistrationQrCode(registrationId), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to load qr code fro registration: " + registrationId);
    }

    return response.json();
}

export async function withdrawEventParticipation(registrationId: number) {
    const withdrawResponse = await fetch(
        VolunteerEndpoints.withdrawEventParticipation(registrationId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!withdrawResponse.ok) {
        throw new Error("Failed to withdraw event participation");
    }
    return withdrawResponse.json();
}

export async function fetchNextProjects(direction: "NEXT" | "PREVIOUS", cursor: string | null, limit: number) {

    //const endpoint = direction === "next" ? VolunteerEndpoints.nextProjects : VolunteerEndpoints.previousProjects;

    const params = new URLSearchParams({limit: String(limit), direction: direction});

    if (cursor) {
        params.set("cursor", cursor);
    }

    const response = await fetch(VolunteerEndpoints.nextProjects(params), {
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

    const response = await fetch(VolunteerEndpoints.searchProjectsByTitle(params), {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("No projects find for the title: " + title);
    }

    return response.json();
}
import {
    fetchAllActiveProjects,
    applyForProject,
    myParticipations,
    withdrawParticipation,
    myProjects,
    myParticipants,
    fetchProjectEvents,
    applyForEvent,
    fetchSingleProjectEvent,
    fetchSingleProjectEventRegistration,
    fetchRegistrationQrCode,
    withdrawEventParticipation,
    fetchNextProjects
} from "@/features/volunteer/volApi.ts";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";

export interface ProjectResponseDto {
    id: number;
    title: string;
    description: string;
    organizationName: string;
    imageUrl?: string;
    location: string;
    startDate: string;
    endDate: string;
    requiredVolunteers: number;
}

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

/**
 * Fetch all active projects
 */
export function useAllActiveProjects() {
    return useQuery<ProjectResponseDto[]>({
        queryKey: ["active-projects"],
        queryFn: fetchAllActiveProjects,
        staleTime: 1000 * 60 * 5,
    });


}

/**
 * Post an application for project participation
 */
export function useApplyForProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: applyForProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["active-projects"],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-participations"],
            });
        },
    });
}

/**
 * Fetch all projects participation applications
 */
export function useMyParticipations() {
    return useQuery({
        queryKey: ["my-participations"],
        queryFn: myParticipations,
        staleTime: DEFAULT_STALE_TIME,
    });


}

/**
 * Fetch all project participants
 */
export function useMyParticipants() {
    return useQuery({
        queryKey: ["my-participants"],
        queryFn: myParticipants,
        staleTime: DEFAULT_STALE_TIME,
    });


}

/**
 *
 */
export function useWithdrawParticipation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: withdrawParticipation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-participations"],
            });
        },
    });
}

/**
 *
 */
export function useMyProjects() {
    return useQuery({
        queryKey: ["my-projects"],
        queryFn: myProjects,
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useProjectEvents(projectId: number) {
    return useQuery({
        queryKey: ["project-events", projectId],
        queryFn: () => fetchProjectEvents(projectId),
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useApplyForEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: applyForEvent,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["project-events"],
            });

            queryClient.invalidateQueries({
                queryKey: ["project-event", variables.projectEventId],
            });

        },
    });
}

export function useSingleProjectEvent(projectEventId: number) {
    return useQuery({
        queryKey: ["project-event", projectEventId],
        queryFn: () => fetchSingleProjectEvent(projectEventId),
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useSingleProjectEventRegistration(projectEventId: number) {
    return useQuery({
        queryKey: ["project-event-registration", projectEventId],
        queryFn: () => fetchSingleProjectEventRegistration(projectEventId),
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useRegistrationQrCode(registrationId: number) {
    return useQuery({
        queryKey: ["registration-qr-code", registrationId],
        queryFn: () => fetchRegistrationQrCode(registrationId),
        enabled: false,
    });
}

export function useWithdrawEventParticipation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: withdrawEventParticipation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project-event-registration"],
            });
        },
    });
}

export function useNextProjects({cursor, limit}: { cursor: string | null, limit: number }) {
    return useQuery({
        queryKey: ["projects-next", cursor, limit],
        queryFn: () => fetchNextProjects(cursor, limit),
        staleTime: DEFAULT_STALE_TIME,
    });
}

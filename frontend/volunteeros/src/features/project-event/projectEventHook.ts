import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    applyForEvent,
    fetchSingleProjectEvent,
    fetchProjectEventRegistration,
    updateProjectEvent,
    cancelProjectEvent,
    completeProjectEvent,
    fetchProjectEventRegistrations,
    startCheckIn,
    startProjectEvent
} from "@/features/project-event/projectEventApi.ts";
import type {ProjectCreateResponseDto} from "@/features/organization/orgTypes.ts";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

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

export function useProjectEventRegistration(projectEventId: number) {
    return useQuery({
        queryKey: ["project-event-registration", projectEventId],
        queryFn: () => fetchProjectEventRegistration(projectEventId),
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useEditProjectEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProjectEvent,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["project-events"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event", variables.projectEventId],
                })
            ])
        },
    });
}

export function useCancelProjectEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelProjectEvent,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["project-events"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event", variables.projectEventId],
                })
            ])
        },
    });
}

export function useCompleteProjectEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeProjectEvent,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["project-events"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event", variables.projectEventId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event-registrations", variables.projectEventId],
                })
            ])
        },
    });
}

export function useProjectEventRegistrations(projectEventId: number) {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["project-event-registrations", projectEventId],
        queryFn: () => fetchProjectEventRegistrations(projectEventId),
        staleTime: DEFAULT_STALE_TIME
    })
}

export function useStartCheckIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: startCheckIn,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["project-events"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event", variables.projectEventId],
                })
            ])
        },
    });
}

export function useStartProjectEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: startProjectEvent,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["project-events"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event", variables.projectEventId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-event-registrations", variables.projectEventId],
                })
            ])
        },
    });
}
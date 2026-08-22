import {
    fetchOrganization,
    fetchApplication,
    postApplication,
    updateOrganization,
    fetchOrganizationProjects,
    createProject,
    updateParticipationStatus,
    updateProject,
    uploadLogo,
    fetchSingleProjectById,
    uploadProjectImage,
    createProjectEvent,
    fetchProjectEvents,
    fetchSingleProjectEventById,
    updateProjectEvent,
    cancelProjectEvent,
    fetchProjectEventRegistrations,
    startCheckIn,
    checkInVolunteer,
    startProjectEvent,
    completeProjectEvent,
    fetchProjectParticipants
} from "@/features/organization/orgApi.ts";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import type {ProjectCreateResponseDto} from "@/features/organization/orgTypes";


const DEFAULT_STALE_TIME = 1000 * 60 * 5;

/**
 *
 */
export function useOrganization() {
    return useQuery({
        queryKey: ["organization"],
        queryFn: fetchOrganization,
        staleTime: 1000 * 60 * 30,
    });
}

/**
 *
 */
export function useApplication() {
    return useQuery({
        queryKey: ["application"],
        queryFn: fetchApplication,
        staleTime: DEFAULT_STALE_TIME
    });

}

/**
 *
 */
export function useApplyApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postApplication,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["application"],
            });
        },
    });
}

/**
 *
 */
export function useEditOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrganization,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["organization"],
            });
        },
    });
}

export function useOrganizationProjects() {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["organization-projects"],
        queryFn: fetchOrganizationProjects,
        staleTime: DEFAULT_STALE_TIME
    });

}

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["organization-projects"],
            });
        },
    });
}

/**
 *  Update participation status
 */
export function useUpdateParticipationStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateParticipationStatus,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["my-participants"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["my-participations"],
            });
        },
    });
}

/**
 *
 */
export function useEditProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["organization-projects"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project", variables.projectId],
                })
            ])
        },
    });
}


export function useUploadLogo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadLogo,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ["organization"],
            })
        }
    })
}

export function useSingleProject(projectId: number) {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["project", projectId],
        queryFn: () => fetchSingleProjectById(projectId),
        enabled: Boolean(projectId),
        staleTime: DEFAULT_STALE_TIME
    })
}

export function useUploadProjectImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadProjectImage,
        onSuccess: async (data, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["project", variables.projectId],
            })
        }
    })
}

export function useCreateProjectEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProjectEvent,

        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["organization-projects"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project", variables.projectId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["project-events", variables.projectId],
                })
            ]);
        },
    });
}

export function useProjectEvents(projectId: number) {
    return useQuery({
        queryKey: ["project-events", projectId],
        queryFn: () => fetchProjectEvents(projectId),
        staleTime: DEFAULT_STALE_TIME
    });

}

export function useSingleProjectEvent(projectEventId: number) {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["project-event", projectEventId],
        queryFn: () => fetchSingleProjectEventById(projectEventId),
        staleTime: DEFAULT_STALE_TIME
    })
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

export function useCheckInVolunteer(projectEventId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: checkInVolunteer,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["project-event-registrations", projectEventId],
            });
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

export function useProjectParticipants(projectId: number) {
    return useQuery({
        queryKey: ["project-participants", projectId],
        queryFn: () => fetchProjectParticipants(projectId),
        staleTime: DEFAULT_STALE_TIME
    })
}
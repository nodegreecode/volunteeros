import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createProject,
    uploadProjectImage,
    updateProject,
    fetchSingleProjectById,
    fetchProjectParticipants,
    fetchAllProjects,
    fetchAllPendingProjects,
    activateProject,
    cancelProject,
    fetchNextProjects,
    searchProjectsByTitle,
    fetchProjectEvents,
    createProjectEvent,
    applyForProject,
    fetchMyProjects,
    fetchOrganizationProjects
} from "./projectApi.ts";
import type {ProjectCreateResponseDto} from "@/features/organization/orgTypes.ts";
import type {CursorPage, ProjectResponse} from "@/features/project/projectTypes.ts";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

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

export function useEditProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,

        onSuccess: async (updatedProject, variables) => {

            queryClient.setQueryData(
                ["project", variables.projectId],
                updatedProject
            );

            queryClient.setQueryData(
                ["organization-projects"],
                (oldProjects) => {
                    if (!oldProjects) return oldProjects;

                    return oldProjects.map((oldProject) =>
                        oldProject.id === updatedProject.id ? updatedProject : oldProject
                    )

                }
            )

        },
    });
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

export function useSingleProject(projectId: number) {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["project", projectId],
        queryFn: () => fetchSingleProjectById(projectId),
        enabled: Boolean(projectId),
        staleTime: DEFAULT_STALE_TIME
    })
}

export function useProjectParticipants(projectId: number) {
    return useQuery({
        queryKey: ["project-participants", projectId],
        queryFn: () => fetchProjectParticipants(projectId),
        staleTime: DEFAULT_STALE_TIME
    })
}

/**
 * Fetch all projects
 */
export function useProjects() {
    return useQuery({
        queryKey: ["all-projects"],
        queryFn: fetchAllProjects,
        staleTime: DEFAULT_STALE_TIME
    });
}

/**
 *
 */
export function usePendingModerationProjects() {
    return useQuery({
        queryKey: ["all-pending-moderation-projects"],
        queryFn: fetchAllPendingProjects,
        staleTime: DEFAULT_STALE_TIME
    });
    ;
}


/**
 * Activate project
 */
export function useActivateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activateProject,
        onSuccess: (updatedProject, variables) => {

            queryClient.setQueryData(
                ["project", variables.projectId],
                updatedProject
            );

            queryClient.setQueryData(
                ["all-projects"],
                (oldProjects) => {
                    if (!oldProjects) return oldProjects;

                    return oldProjects.map((oldProject) =>
                        oldProject.id === updatedProject.id ? updatedProject : oldProject
                    )

                }
            );

            queryClient.setQueryData(
                ["all-pending-moderation-projects"],
                (oldProjects) => {
                    if (!oldProjects) return oldProjects;
                    return oldProjects.filter((oldProject) => oldProject.id !== updatedProject.id);
                }
            );
        },
    });
}

/**
 * Cancel project
 */
export function useCancelProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelProject,
        onSuccess: (updatedProject, variables) => {

            queryClient.setQueryData(
                ["project", variables.projectId],
                updatedProject
            );

            queryClient.setQueryData(
                ["all-projects"],
                (oldProjects) => {
                    if (!oldProjects) return oldProjects;

                    return oldProjects.map((oldProject) =>
                        oldProject.id === updatedProject.id ? updatedProject : oldProject
                    )

                }
            );

            queryClient.setQueryData(
                ["all-pending-moderation-projects"],
                (oldProjects) => {
                    if (!oldProjects) return oldProjects;
                    return oldProjects.filter((oldProject) => oldProject.id !== updatedProject.id);
                }
            );

        },
    });
}

export function useNextProjects({direction, cursor, limit}: {
    direction: "NEXT" | "PREVIOUS",
    cursor: string | null,
    limit: number
}) {
    return useQuery<CursorPage<ProjectResponse>>({
        queryKey: ["projects-next", direction, cursor, limit],
        queryFn: () => fetchNextProjects(direction, cursor, limit),
        staleTime: DEFAULT_STALE_TIME,
    });
}

export function useSearchProjectsByTitle({title, cursor, limit, direction, enabled}: {
    title: string;
    cursor: string | null,
    limit: number,
    direction: "NEXT" | "PREVIOUS",
    enabled: boolean,
}) {
    return useQuery<CursorPage<ProjectResponse>>({
        queryKey: ["projects-by-title", title, cursor, limit, direction],
        queryFn: () => searchProjectsByTitle(title, cursor, limit, direction),
        staleTime: DEFAULT_STALE_TIME,
        enabled
    });
}

export function useProjectEvents(projectId: number) {
    return useQuery({
        queryKey: ["project-events", projectId],
        queryFn: () => fetchProjectEvents(projectId),
        staleTime: DEFAULT_STALE_TIME
    });

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

export function useMyProjects() {
    return useQuery({
        queryKey: ["my-projects"],
        queryFn: fetchMyProjects,
        staleTime: DEFAULT_STALE_TIME,
    });
}


export function useOrganizationProjects() {
    return useQuery<ProjectCreateResponseDto>({
        queryKey: ["organization-projects"],
        queryFn: fetchOrganizationProjects,
        staleTime: DEFAULT_STALE_TIME
    });

}

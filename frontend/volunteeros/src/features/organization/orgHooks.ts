import {
    fetchOrganization,
    fetchApplication,
    postApplication,
    updateOrganization,
    fetchOrganizationProjects,
    createProject,
    updateParticipationStatus,
    updateProject,
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

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["organization-projects"],
            });
        },
    });
}

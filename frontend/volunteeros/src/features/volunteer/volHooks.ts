import {
    fetchAllActiveProjects,
    applyForProject,
    myParticipations,
    withdrawParticipation,
    myProjects,
    myParticipants
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

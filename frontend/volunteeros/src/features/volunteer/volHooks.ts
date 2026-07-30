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

/**
 *
 */
export function useAllActiveProjects() {
    return useQuery<ProjectResponseDto[]>({
        queryKey: ["active-projects"],
        queryFn: fetchAllActiveProjects,
        staleTime: 1000 * 60 * 5,
    });

}

/**
 *
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
 * Fetch all participations
 */
export function useMyParticipations() {
    const query = useQuery({
        queryKey: ["my-participations"],
        queryFn: myParticipations,
    });

    return {...query, myParticipations: query.data};
}

/**
 * Fetch all participants
 */
export function useMyParticipants() {
    const query = useQuery({
        queryKey: ["my-participants"],
        queryFn: myParticipants,
        retry: false,
    });

    return {...query, myParticipants: query.data};
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
    const query = useQuery({
        queryKey: ["my-projects"],
        queryFn: myProjects,
    });

    return {...query, myProjects: query.data};
}

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    myParticipations,
    withdrawParticipation,
    myParticipants,
    updateParticipationStatus
} from "@/features/project-participation/projectParticipationApi.ts";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

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
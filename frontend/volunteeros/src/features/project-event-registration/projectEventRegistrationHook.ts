import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    fetchRegistrationQrCode,
    withdrawEventParticipation,
    checkInVolunteer
} from "@/features/project-event-registration/projectEventRegistrationApi.ts";


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
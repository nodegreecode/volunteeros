import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {
    createOrganizationApplication,
    fetchOrganizationApplication,
    fetchOrganizationApplications,
    approveOrganizationApplication,
    rejectOrganizationApplication,
    fetchAllApplicationsByUser
} from "@/features/organization-application/orgApplicationApi.ts";


const DEFAULT_STALE_TIME = 1000 * 60 * 5;

/**
 *
 */
export function useCreateOrganizationApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrganizationApplication,

        onSuccess: async (organizationApplication) => {
            await queryClient.setQueryData(
                ["organization-application"],
                organizationApplication,
            );
        },
    });
}

/**
 *
 */
export function useOrganizationApplication() {
    return useQuery({
        queryKey: ["organization-application"],
        queryFn: fetchOrganizationApplication,
        staleTime: DEFAULT_STALE_TIME
    });

}

/**
 * Fetch all applications with status PENDING
 */
export function useOrganizationApplications() {
    const query = useQuery({
        queryKey: ["organization-applications"],
        queryFn: fetchOrganizationApplications,
        retry: false,
    });

    return {...query, pendingApplications: query.data ?? null};
}

export function useApproveOrganizationApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({applicationId}: { applicationId: number }) =>
            approveOrganizationApplication({applicationId}),

        onSuccess: (updatedOrganizationApplication) => {
            queryClient.setQueryData(
                ["organization-applications"],
                (organizationApplications) => {
                    if (!organizationApplications) {
                        return organizationApplications;
                    }

                    return organizationApplications.filter((application) =>
                        application.id !== updatedOrganizationApplication.id
                    );
                }
            );
        },
    });
}

export function useRejectOrganizationApplication() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({applicationId}: { applicationId: number }) =>
            rejectOrganizationApplication({applicationId}),

        onSuccess: (updatedOrganizationApplication) => {
            queryClient.setQueryData(
                ["organization-applications"],
                (organizationApplications) => {
                    if (!organizationApplications) {
                        return organizationApplications;
                    }

                    return organizationApplications.filter((application) =>
                        application.id !== updatedOrganizationApplication.id
                    );
                }
            );
        },
    });
}

/**
 * Fetch applications by useId(organization user)
 * @param userId
 */
export function useUserApplications(userId?: number) {
    const query = useQuery({
        queryKey: ["organization-applications", userId],
        queryFn: () => fetchAllApplicationsByUser(userId!),
        enabled: userId != null,
    });

    return { ...query, applications: query.data ?? null };
}
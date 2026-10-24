import {
    fetchOrganization,
    updateOrganization,
    uploadLogo,
    fetchAllOrganizations
} from "@/features/organization/orgApi.ts";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import type {Organization} from "@/features/admin/adminTypes.ts";

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
export function useEditOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrganization,

        onSuccess: async (updatedOrganization) => {
            await queryClient.setQueryData(
                ["organization"],
                updatedOrganization
            );
        },
    });
}

/**
 * Fetch all organizations
 */
export function useOrganizations() {
    const query = useQuery<Organization[]>({
        queryKey: ["organizations"],
        queryFn: fetchAllOrganizations,
        staleTime: DEFAULT_STALE_TIME
    });

    return {...query, organizations: query.data ?? null};
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
import {
    editProfile,
    uploadAvatar,
    fetchProfile,
    fetchNotifications,
    fetchUnreadNotifications,
    markNotificationAsRead
} from "@/features/users/userApi.ts";
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import type {Role} from "@/shared/types/types.ts";


interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    city: string;
    phone: string;
    avatar: string;
    bio: string;
    createdA: string;
    updatedAt: string;
}


/**
 *  UseProfile
 */
export function useProfile() {
    return useQuery<User>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}

export function useEditProfile() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProfile,
        onSuccess: async (updatedProfile: User) => {
            await queryClient.setQueryData(
                ["profile"],
                updatedProfile
            )
        }
    })

}

export function useUploadAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadAvatar,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["profile"],
            })
        }
    })
}

export function useNotifications() {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        staleTime: 1000 * 60 * 5,
    })
}

export function useUnreadNotifications() {
    return useQuery({
        queryKey: ["unread-notifications"],
        queryFn: fetchUnreadNotifications,
        refetchInterval: 30_000,
        refetchIntervalInBackground: false,
    })
}

export function useMarkNotificationAsRead() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markNotificationAsRead,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["unread-notifications"],
            });
        }
    })
}
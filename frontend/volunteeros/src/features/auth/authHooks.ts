import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {
    loginUser,
    logoutUser,
    fetchProfile,
    registerUser,
} from "@/features/auth/authApi.ts";
import type {Role} from "@/shared/types/types.ts";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email:string;
    roles: Role[];
    city: string;
    phone: string;
    avatar: string;
    bio: string;
    createdA: string;
    updatedAt: string;
}


/**
 *  UseRegister
 */
export function useRegister() {

    return useMutation({
        mutationFn: registerUser,
    });
}

/**
 *  UseLogin
 */
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });
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
        //refetchOnWindowFocus: false,
    });
}

/**
 *  UseAuth
 */
export function useAuth() {
    const query = useProfile();
    return {
        ...query,
        isAuthenticated: Boolean(query.data),
    };
}

/**
 * UseLogout
 */
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: async () => {
            /*  await queryClient.cancelQueries({
                  queryKey: ["profile"],
              });
              queryClient.removeQueries({
                  queryKey: ["profile"],
              })*/

            await queryClient.cancelQueries();

            queryClient.clear();

        }
    });
}



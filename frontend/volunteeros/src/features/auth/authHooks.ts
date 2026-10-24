import {useQueryClient, useMutation } from "@tanstack/react-query";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "@/features/auth/authApi.ts";
import {useProfile} from "@/features/users/userHooks.ts";

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
            await queryClient.cancelQueries();
            queryClient.clear();
        }
    });
}



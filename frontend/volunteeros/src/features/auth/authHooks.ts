import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  logoutUser,
  fetchProfile,
  registerUser,
} from "@/features/auth/authApi.ts";

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
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      await queryClient.removeQueries({
        queryKey: ["profile"],
      });

      queryClient.clear();
    },
  });
}

/**
 *  UseProfile
 */
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

/**
 *  UseAuth
 */
export function useAuth() {
  const query = useProfile();
  return {
    ...query,
    user: query.data,
    isAuthenticated: Boolean(query.data),
  };
}

/**
 *  UseRegister
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["registration"],
      });
    },
  });
}

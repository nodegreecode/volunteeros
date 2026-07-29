import {
  fetchOrganization,
  fetchApplication,
  postApplication,
  updateOrganization,
  fetchOrganizationProjects,
  createProject,
  updateParticipationStatus,
  updateProject,
} from "@/features/organization/orgApi.ts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { ProjectCreateResponseDto } from "@/features/organization/orgTypes";

/**
 *
 */
export function useOrganization() {
  const query = useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganization,
    retry: false,
  });

  return { ...query, organization: query.data };
}

/**
 *
 */
export function useApplication() {
  const query = useQuery({
    queryKey: ["application"],
    queryFn: fetchApplication,
    retry: false,
  });

  return { ...query, application: query.data };
}

/**
 *
 */
export function useApplyApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postApplication,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["application"],
      });
    },
  });
}

/**
 *
 */
export function useEditOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrganization,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["organization"],
      });
    },
  });
}

export function useOrganizationProjects() {
  const query = useQuery<ProjectCreateResponseDto>({
    queryKey: ["organization-projects"],
    queryFn: fetchOrganizationProjects,
  });

  return { ...query, projects: query.data };
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["organization-projects"],
      });
    },
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

/**
 *
 */
export function useEditProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["organization-projects"],
      });
    },
  });
}

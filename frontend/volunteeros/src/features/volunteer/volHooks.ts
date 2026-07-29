import {
  fetchAllActiveProjects,
  applyForProject,
  myParticipations,
  withdrawParticipation,
  myProjects,
  myParticipants
} from "@/features/volunteer/volApi.ts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export interface ProjectResponseDto {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  requiredVolunteers: string;
  createdAt: string;
}

/**
 *
 */
export function useAllActiveProjects() {
  const query = useQuery<ProjectResponseDto[]>({
    queryKey: ["active-projects"],
    queryFn: fetchAllActiveProjects,
  });

  return { ...query, projects: query.data };
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

  return { ...query, myParticipations: query.data };
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

  return { ...query, myParticipants: query.data };
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

  return { ...query, myProjects: query.data };
}

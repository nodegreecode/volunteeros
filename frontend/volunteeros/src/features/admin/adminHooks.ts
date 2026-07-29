import { useEffect, useState } from "react";
import {
  fetchAllOrganizations,
  fetchAllApplicationsByUser,
  fetchAllPendingApplications,
  updateApplicationStatus,
  fetchAllProjects,
  fetchAllPendingProjects,
  activateProject,
  cancelProject,
} from "@/features/admin/adminApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Organization } from "@/features/admin/adminTypes.ts";
import { OrganizationEndpoints } from "@/api/volunteeros-be-api.ts";

export interface AdminNotificationEvent {
  type: string;
  projectId: number;
  message: string;
}

/**
 * Fetch all organizations
 */
export function useOrganizations() {
  const query = useQuery<Organization[]>({
    queryKey: ["organizations"],
    queryFn: fetchAllOrganizations,
    retry: false,
  });

  return { ...query, organizations: query.data ?? null };
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

/**
 * Fetch all applications with status PENDING
 */
export function usePendingApplicaitons() {
  const query = useQuery ({
    queryKey: ["pending-organization-applicaitons"],
    queryFn: fetchAllPendingApplications,
    retry: false,
  });

  return { ...query, pendingApplications: query.data ?? null };
}

/**
 *
 */
export function useApplicationUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationStatus,
    onMutate: async ({ applicationId, status }) => {
      await queryClient.cancelQueries({
        queryKey: ["pending-organization-applicaitons"],
      });

      const previousApplications = queryClient.getQueryData (["pending-organization-applicaitons"]);

      queryClient.setQueryData (
        ["pending-organization-applicaitons"],
        (old = []) =>
          old.map((application) =>
            application.id === applicationId
              ? {
                  ...application,
                  applicationStatus: status,
                }
              : application,
          ),
      );

      return { previousApplications };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousApplications) {
        queryClient.setQueryData(
          ["pending-organization-applicaitons"],
          context.previousApplications,
        );
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["organization-applications"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["pending-organization-applicaitons"],
        }),
      ]);
    },
  });
}

/**
 * Fetch all projects
 */
export function useProjects() {
  const query = useQuery({
    queryKey: ["all-projects"],
    queryFn: fetchAllProjects,
    retry: false,
  });

  return { ...query, projects: query.data ?? null };
}

/**
 *
 */
export function usePendingModerationProjects() {
  const query = useQuery({
    queryKey: ["all-pending-moderation-projects"],
    queryFn: fetchAllPendingProjects,
    retry: false,
  });

  return { ...query, pendingProjects: query.data ?? null };
}

/**
 * Activate project
 */
export function useActivateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-pending-moderation-projects"],
      });
    },
  });
}

/**
 * Cancel project
 */
export function useCancelProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-pending-moderation-projects"],
      });
    },
  });
}

/**
 * Open SSE and listen to new pending moderation projects
 *
 */
export function usePendingProjectsSse() {
  const queryClient = useQueryClient();

  const [notifications, setNotifications] = useState<AdminNotificationEvent[]>(
    [],
  );

  useEffect(() => {
    const eventSource = new EventSource(
      OrganizationEndpoints.adminSsePendingProjects,
      { withCredentials: true },
    );

    eventSource.addEventListener("PROJECT_PENDING_MODERATION", (event) => {
      const notification: AdminNotificationEvent = JSON.parse(event.data);

      setNotifications((prev) => [notification, ...prev]);

      queryClient.invalidateQueries({
        queryKey: ["all-pending-moderation-projects"],
      });

    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error", error);
    };

    return () => eventSource.close();
  }, [queryClient]);

  return {
    notifications,
    notificationCount: notifications.length,
  };
}

export function useDataBaseStatus() {

  useEffect(() => {
    const source = new EventSource( OrganizationEndpoints.adminDatabaseStatus, { withCredentials: true });

    source.addEventListener(
        "database-status",
        event => {
          const status = JSON.parse(event.data);
          console.log(status);
        }
    )

    source.onerror = (e) => {
      console.error(e);
    };

    return () => source.close();
  }, []);


}
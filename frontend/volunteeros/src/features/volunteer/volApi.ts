import { OrganizationEndpoints } from "@/api/volunteeros-be-api.ts";
import { VolunteerEndpoints } from "@/api/volunteeros-be-api.ts";
import type { ProjectResponseDto } from "@/features/volunteer/volHooks.ts";

type ApplyForProjectParams = {
  projectId: number;
};

type WithdrawParticipationParams = {
  participationId: number;
};

/**
 *
 */
export async function fetchAllActiveProjects(): Promise<ProjectResponseDto[]> {
  const activeProjectsResponse = await fetch(
    OrganizationEndpoints.activeProjects,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!activeProjectsResponse.ok) {
    throw new Error("Failed to load projects ");
  }

  return activeProjectsResponse.json();
}

/**
 *
 * @param values
 */
export async function applyForProject({ projectId }: ApplyForProjectParams) {
  const applicationResponse = await fetch(VolunteerEndpoints.apply(projectId), {
    method: "POST",
    credentials: "include",
  });

  if (!applicationResponse.ok) {
    throw new Error("Failed to apply for project");
  }

  return applicationResponse.json();
}

export async function myParticipations() {
  const participationsResponse = await fetch(
    VolunteerEndpoints.myParticipation,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!participationsResponse.ok) {
    throw new Error("Failed to find participations");
  }

  return participationsResponse.json();
}

export async function myParticipants() {
  const participantsResponse = await fetch(VolunteerEndpoints.myParticipants, {
    method: "GET",
    credentials: "include",
  });

  if (!participantsResponse.ok) {
    throw new Error("Failed to find participants");
  }

  return participantsResponse.json();
}

export async function withdrawParticipation({
  participationId,
}: WithdrawParticipationParams) {
  const withdrawResponse = await fetch(
    VolunteerEndpoints.withdrawParticipation(participationId),
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  if (!withdrawResponse.ok) {
    throw new Error("Failed to withdraw participation");
  }
  return withdrawResponse.json();
}

/**
 *
 */
export async function myProjects() {
  const myProjectsResponse = await fetch(VolunteerEndpoints.myProjects, {
    method: "GET",
    credentials: "include",
  });

  if (!myProjectsResponse.ok) {
    throw new Error("Failed to load projects");
  }

  return myProjectsResponse.json();
}

import { OrganizationEndpoints, BASE_URL } from "@/api/volunteeros-be-api.ts";
import type {
  ApplicationStatus,
  Organization,
  OrganizationApplicationResponseDto,
} from "@/features/admin/adminTypes.ts";

type UpdateApplicationStatusParams = {
  applicationId: number;
  status: ApplicationStatus;
};

type ActivateProjectParams = {
  projectId: number;
};

/**
 *  Fetch all organizations
 */
export async function fetchAllOrganizations(): Promise<Organization[]> {
  const organizationsResponse = await fetch(
    OrganizationEndpoints.organizations,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!organizationsResponse.ok) {
    throw new Error("Failed to load organizations.");
  }

  return organizationsResponse.json();
}

/**
 * Fetch all applications by userId
 * @param userId
 */
export async function fetchAllApplicationsByUser(
  userId: number,
): Promise<OrganizationApplicationResponseDto[]> {
  const userApplicationsResponse = await fetch(
    `${BASE_URL}/api/organizations/${userId}/applications`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!userApplicationsResponse.ok) {
    throw new Error("Failed to load  applications.");
  }

  return userApplicationsResponse.json();
}

/**
 *  Fetch all applications with status PENDING
 */
export async function fetchAllPendingApplications() {
  const applicationsResponse = await fetch(OrganizationEndpoints.applications, {
    method: "GET",
    credentials: "include",
  });

  if (!applicationsResponse.ok) {
    throw new Error("Failed to load  applications.");
  }

  return applicationsResponse.json();
}

/**
 *
 */
export async function updateApplicationStatus({
  applicationId,
  status,
}: UpdateApplicationStatusParams): Promise<OrganizationApplicationResponseDto> {
  const applicationStatusResponse = await fetch(
    OrganizationEndpoints.applicationStatus(applicationId),
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicationStatus: status }),
    },
  );

  if (!applicationStatusResponse.ok) {
    throw new Error("Applications status update failed");
  }

  return applicationStatusResponse.json();
}

/**
 *  Fetch all  projects
 */
export async function fetchAllProjects(){
  const projectsResponse = await fetch(OrganizationEndpoints.allProjects, {
    method: "GET",
    credentials: "include",
  });

  if (!projectsResponse.ok) {
    throw new Error("Failed to load projects.");
  }

  return projectsResponse.json();
}

/**
 *  Fetch all  pending moderation projects
 */
export async function fetchAllPendingProjects() {
  const projectsResponse = await fetch(OrganizationEndpoints.allPendingModerationProjects, {
    method: "GET",
    credentials: "include",
  });

  if (!projectsResponse.ok) {
    throw new Error("Failed to load pending projects.");
  }

  return projectsResponse.json();
}


/**
 * Activate project
 */
export async function activateProject({ projectId }: ActivateProjectParams) {
  const projectStatusResponse = await fetch(
    OrganizationEndpoints.activeProjectStatus(projectId),
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  if (!projectStatusResponse.ok) {
    throw new Error("Project status update failed");
  }

  return projectStatusResponse.json();
}

/**
 * Cancel project
 */
export async function cancelProject({ projectId }: ActivateProjectParams) {
  const projectStatusResponse = await fetch(
    OrganizationEndpoints.cancelProjectStatus(projectId),
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  if (!projectStatusResponse.ok) {
    throw new Error("Project status update failed");
  }

  return projectStatusResponse.json();
}
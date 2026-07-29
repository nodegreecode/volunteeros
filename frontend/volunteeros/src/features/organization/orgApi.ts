import { OrganizationEndpoints } from "@/api/volunteeros-be-api.ts";
import type { ApplicationStatus } from "@/features/admin/adminTypes.ts";
import type {
  OrganizationUpdateRequestDto,
  ProjectCreateResponseDto,
} from "@/features/organization/orgTypes.ts";

export interface ApplicationRequestDto {
  userId: number;
  organizationForm: string;
  organizationName: string;
  description: string;
  memberRole: string;
}

export type ProjectCreateRequest = {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  requiredVolunteers: number;
};

type CreateProjectParams = {
  organizationId: number;
  values: ProjectCreateRequest;
};

type UpdateOrganizationParams = {
  organizationId: number;
  values: OrganizationUpdateRequestDto;
};

type UpdateProjectParams = {
  projectId: number;
  values: ProjectEditRequestDto;
};

export interface ProjectEditRequestDto {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  requiredVolunteers: number;
}

/**
 *
 */
export async function fetchOrganization() {
  const organizationResponse = await fetch(OrganizationEndpoints.organization, {
    credentials: "include",
  });

  if (organizationResponse.status === 404) {
    return null;
  }

  if (!organizationResponse.ok) {
    throw new Error("Failed to load organization. Organization does not exist");
  }

  return organizationResponse.json();
}

/**
 *
 */
export async function fetchApplication() {
  const applicationResponse = await fetch(OrganizationEndpoints.application, {
    credentials: "include",
  });

  if (!applicationResponse.ok) {
    throw new Error("Failed to load application. Application does not exist");
  }

  return applicationResponse.json();
}

/**
 *
 * @param values
 */
export async function postApplication(values: ApplicationRequestDto) {
  const applicationResponse = await fetch(OrganizationEndpoints.applications, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  });

  if (!applicationResponse.ok) {
    throw new Error("Failed to apply for organization ");
  }

  return applicationResponse.json();
}

/**
 * Edit organization information
 */
export async function updateOrganization({
  organizationId,
  values,
}: UpdateOrganizationParams) {
  const response = await fetch(
    OrganizationEndpoints.organizationEdit(organizationId),
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update organization");
  }

  return response.json();
}

/**
 *
 */
export async function fetchOrganizationProjects(): Promise<
  ProjectCreateResponseDto[]
> {
  const response = await fetch(OrganizationEndpoints.myProjects, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organization projects");
  }

  return response.json();
}

/**
 *
 */
export async function createProject({
  organizationId,
  values,
}: CreateProjectParams) {
  const response = await fetch(
    OrganizationEndpoints.createProject(organizationId),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return await response.json();
}

/**
 * Update participation status
 */
export async function updateParticipationStatus({ participationId, status }) {
  const participationStatusResponse = await fetch(
    OrganizationEndpoints.participationStatus(participationId),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    },
  );

  if (!participationStatusResponse.ok) {
    throw new Error("Participation status update failed");
  }

  return participationStatusResponse.text();
}

/**
 * Edit project information
 */
export async function updateProject({ projectId, values, }: UpdateProjectParams) {
  const response = await fetch(OrganizationEndpoints.editProject(projectId), {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
}

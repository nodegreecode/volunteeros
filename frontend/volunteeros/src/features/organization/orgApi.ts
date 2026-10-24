import type {OrganizationUpdateRequestDto,} from "@/features/organization/orgTypes.ts";
import {apiFetch} from "@/features/auth/authApi.ts";
import type { Organization } from "@/features/admin/adminTypes.ts";
import {OrganizationUrls} from "@/api/volunteeros-be-api.ts";

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

export interface ProjectEventEditRequestDto {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    capacity: number;
}

export interface OrganizationResponseDto {
    id: string;
    ownerId: string;
    orgForm: string;
    orgName: string;
    registrationNumber: string;
    description: string;
    website: string;
    registrationCountry: string;
    city: string;
    street: string;
    phone: string;
    email: string;
    avatar: OrganizationAvatar | null;
    applicationsCount: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface OrganizationAvatar {
    contentType: string;
    id: number;
    originalFilename: string;
    publicId: string;
    size: number;
    uploadedAt: string;
    url: string;
}

/**
 *
 */
export async function fetchOrganization() {
    const organizationResponse = await apiFetch(OrganizationUrls.getOrganization, {
        credentials: "include",
    });

    if (!organizationResponse.ok) {
        throw new Error("Failed to load organization. Organization does not exist");
    }

    const data = await organizationResponse.json();

    return data.data;
}



/**
 * Edit organization information
 */
export async function updateOrganization({values}: UpdateOrganizationParams) {
    const response = await fetch(
        OrganizationUrls.updateOrganization,
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
 *  Fetch all organizations
 */
export async function fetchAllOrganizations(): Promise<Organization[]> {
    const organizationsResponse = await fetch(
        OrganizationUrls.getAllOrganizations,
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





export async function uploadLogo(image) {

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(OrganizationUrls.uploadOrganizationLogo,
        {
            method: "POST",
            credentials: "include",
            body: formData
        });

    if (!response.ok) {
        throw new Error("Failed to upload logo");
    }
}
import {OrganizationApplicationUrls} from "@/api/volunteeros-be-api.ts";
import {apiFetch} from "@/features/auth/authApi.ts";
import type {OrganizationApplicationResponseDto} from "@/features/admin/adminTypes.ts";

export interface ApplicationRequestDto {
    userId: number;
    organizationForm: string;
    organizationName: string;
    description: string;
    memberRole: string;
}

/**
 *
 * @param values
 */
export async function createOrganizationApplication(values: ApplicationRequestDto) {
    const applicationResponse = await fetch(OrganizationApplicationUrls.createOrganizationApplication, {
        method: "POST",
        headers: {"content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to apply for organization ");
    }

    return applicationResponse.json();
}

/**
 *
 */
export async function fetchOrganizationApplication() {
    const applicationResponse = await apiFetch(OrganizationApplicationUrls.getOrganizationApplication, {
        credentials: "include",
    });

    if (!applicationResponse.ok) {
        throw new Error("Failed to load application. Application does not exist");
    }

    const data = await applicationResponse.json();

    return data.data;
}

export async function fetchOrganizationApplications() {
    const applicationsResponse = await fetch(OrganizationApplicationUrls.getOrganizationApplications, {
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
export async function approveOrganizationApplication({applicationId}): Promise<OrganizationApplicationResponseDto> {
    const organizationApplicationResponse = await fetch(
        OrganizationApplicationUrls.approveOrganizationApplication(applicationId),
        {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            credentials: "include",
        },
    );

    if (!organizationApplicationResponse.ok) {
        throw new Error("Applications status update failed");
    }

    return organizationApplicationResponse.json();
}

/**
 *
 */
export async function rejectOrganizationApplication({applicationId}): Promise<OrganizationApplicationResponseDto> {
    const organizationApplicationResponse = await fetch(
        OrganizationApplicationUrls.rejectOrganizationApplication(applicationId),
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    if (!organizationApplicationResponse.ok) {
        throw new Error("Applications status update failed");
    }

    return organizationApplicationResponse.json();
}

/**
 * Fetch all applications by userId
 * @param userId
 */
export async function fetchAllApplicationsByUser(
    userId: number,
): Promise<OrganizationApplicationResponseDto[]> {
    const userApplicationsResponse = await fetch(
         OrganizationApplicationUrls.getOrganizationApplicationByUserId(userId),
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
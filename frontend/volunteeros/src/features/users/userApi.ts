import {NotificationUrls, UserUrls} from "@/api/volunteeros-be-api.ts"
import {apiFetch} from "@/features/auth/authApi";

interface ProfileRequestDto {
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    bio: string;
}

interface ProfileResponseDto {
    values: {
        firstName: string;
        lastName: string;
        city: string;
        phone: string;
        avatar: string
        bio: string
        createdAt: string;
        updatedAt: string
    }
}

type NotificationType =
    "ORGANIZATION_APPLICATION_CREATED" |
    "ORGANIZATION_APPLICATION_APPROVED" |
    "ORGANIZATION_APPLICATION_REJECTED" |
    "PROJECT_CREATED" |
    "PROJECT_APPROVED" |
    "PROJECT_PENDING_MODERATION";

interface NotificationResponse {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

/**
 *  Fetch user profile
 */
export async function fetchProfile() {

    const profileResponse = await apiFetch(UserUrls.profile);

    if (profileResponse.status == 401 || profileResponse.status == 403) {
        return null;
    }

    if (!profileResponse.ok) {
        throw new Error("Failed to load user data");
    }

    return await profileResponse.json();
}

export async function editProfile({values}: ProfileRequestDto): Promise<ProfileResponseDto> {
    const response = await fetch(UserUrls.profile, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error("Failed to edit profile");
    }

    return await response.json();
}

export async function uploadAvatar(image) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(UserUrls.uploadAvatar, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload avatar");
    }

}

export async function fetchNotifications(): Promise<NotificationResponse[]> {
    const response = await fetch(NotificationUrls.getAll, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    return await response.json() as NotificationResponse[];
}

export async function fetchUnreadNotifications(): Promise<NotificationResponse[]> {
    const response = await fetch(NotificationUrls.getAllUnread, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch unread notifications");
    }

    return await response.json() as NotificationResponse[];
}

export async function markNotificationAsRead(notificationId: number): Promise<void> {
    const response = await fetch(NotificationUrls.markAsRead(notificationId), {
        method: "PATCH",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to edit profile");
    }

}
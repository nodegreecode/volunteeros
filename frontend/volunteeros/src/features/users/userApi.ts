import {UsersUrls} from "@/api/volunteeros-be-api.ts"


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

export async function editProfile({values}: ProfileRequestDto): Promise<ProfileResponseDto> {
    const response = await fetch(UsersUrls.editProfile, {
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

    const response = await fetch(UsersUrls.uploadAvatar, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if(!response.ok) {
        throw new Error("Failed to upload avatar");
    }

}
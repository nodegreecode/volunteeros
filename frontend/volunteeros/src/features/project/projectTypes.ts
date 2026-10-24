
export interface ImageUploadResponse {
    publicId: string;
    secureUrl: string;
}

export interface ProjectResponse {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    requiredVolunteers: string;
    image: ImageUploadResponse;
    createdAt: string;
    updatedAt: string;
}

export interface CursorPage<T> {
    projects: T[];
    nextCursor?: string | null;
    previousCursor?: string | null;
}
export type Role = "ROLE_ORGANIZATION" | "ROLE_VOLUNTEER" | "ROLE_ADMIN";

export interface User {
    id: number;
    roles: Role[];
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    avatar: string;
    bio: string;
    createdA: string;
    updatedAt: string;
}

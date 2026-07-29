export type Role = "ROLE_ORGANIZATION" | "ROLE_VOLUNTEER" | "ROLE_ADMIN";

export interface User {
  id: string;
  roles: Role[];
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  avatar: null;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

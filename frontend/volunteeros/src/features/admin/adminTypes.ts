

export interface Organization {
  id: number;
  orgName: string;
  orgForm: string;
  description: string;
  website: string;
  city: string;
  createdAt: string;
  avatar: string;
  updatedAt: string;
  phone: string;
  email: string;
  ownerId: number;
  applicationsCount: number;
}

export interface OrganizationApplicationResponseDto {
  id: number;
  organizationForm: string;
  organizationName: string;
  applicationStatus: string;
  description: string;
  memberRole: string;
  submittedAt: string;
  reviewedAt: string | null;
}

export type ApplicationStatus = "PENDING" | "REJECTED" | "APPROVED";

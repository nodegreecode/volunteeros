export interface OrganizationResponseDto {
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
  applicationsCount: number;
}

export interface OrganizationUpdateRequestDto {
  name: string;
  form: string;
  description: string;
  website: string;
  location: string;
  phone: string;
}

export interface ProjectCreateResponseDto {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  requiredVolunteers: string;
  createdAt: string;
}

export type ParticipationStatus =
  "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface ProjectParticipationResponseDto {
  id: number;
  projectId: number;
  projectTitle: string;
  volunteerId: number;
  status: ParticipationStatus;
  joinedAt: string;
  rejectedAt: string | null;
}

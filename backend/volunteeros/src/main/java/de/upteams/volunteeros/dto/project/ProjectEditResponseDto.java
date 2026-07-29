package de.upteams.volunteeros.dto.project;

public record ProjectEditResponseDto(
        String id,
        String organizationId,
        String title,
        String description,
        String location,
        String startDate,
        String endDate,
        String status,
        String requiredVolunteers,
        String createdAt,
        String updatedAt
        ) {
}

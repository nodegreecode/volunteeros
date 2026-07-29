package de.upteams.volunteeros.dto.project;

public record ProjectDetailDto(String id,
                               String title,
                               String description,
                               String location,
                               String startDate,
                               String endDate,
                               String status,
                               String requiredVolunteers,
                               String createdAt) {
}

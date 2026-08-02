package de.upteams.volunteeros.dto.project;

import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;

public record ProjectResponseDto(String id,
                                 String title,
                                 String description,
                                 String location,
                                 String startDate,
                                 String endDate,
                                 String status,
                                 String requiredVolunteers,
                                 ImageUploadResponseDto image,
                                 String createdAt) {
}

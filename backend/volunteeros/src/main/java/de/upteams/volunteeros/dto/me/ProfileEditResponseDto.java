package de.upteams.volunteeros.dto.me;

public record ProfileEditResponseDto(String firstName,
                                     String lastName,
                                     String city,
                                     String phone,
                                     String avatar,
                                     String bio,
                                     String createdAt,
                                     String updatedAt) {
}

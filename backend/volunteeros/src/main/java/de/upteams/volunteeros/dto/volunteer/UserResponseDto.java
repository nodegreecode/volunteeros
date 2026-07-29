package de.upteams.volunteeros.dto.volunteer;

import de.upteams.volunteeros.domain.UserRole;

public record UserResponseDto(String firstName,
                              String lastName,
                               String role) {
}

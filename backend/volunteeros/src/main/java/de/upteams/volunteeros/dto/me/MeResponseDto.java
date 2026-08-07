package de.upteams.volunteeros.dto.me;

import de.upteams.volunteeros.domain.enums.UserRoleType;

import java.time.Instant;
import java.util.List;

public record MeResponseDto(Long id,
                            String firstName,
                            String lastName,
                            String email,
                            List<UserRoleType> roles,
                            String city,
                            String phone,
                            String avatar,
                            String bio,
                            Instant createdAt,
                            Instant updatedAt) {
}


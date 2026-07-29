package de.upteams.volunteeros.dto.me;

import de.upteams.volunteeros.domain.enums.UserRoleType;

import java.time.Instant;
import java.util.List;

public record MeResponseDto(Long id,
                            List<UserRoleType> roles,
                            String firstName,
                            String lastName,
                            String city,
                            String phone,
                            String avatar,
                            String bio,
                            Instant createdAt,
                            Instant updatedAt) {
}


package de.upteams.volunteeros.dto.me;

import de.upteams.volunteeros.domain.enums.UserRoleType;
import de.upteams.volunteeros.domain.model.Image;

import java.time.Instant;
import java.util.List;

public record MeResponseDto(Long id,
                            String firstName,
                            String lastName,
                            String email,
                            List<UserRoleType> roles,
                            String city,
                            String phone,
                            Image avatar,
                            String bio,
                            Instant createdAt,
                            Instant updatedAt) {
}


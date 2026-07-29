package de.upteams.volunteeros.dto.participation;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;

import java.time.Instant;

public record ProjectParticipationResponseDto(
        Long id,
        Long projectId,
        String projectTitle,
        String organizationName,
        Long volunteerId,
        ParticipationStatus status,
        Instant joinedAt,
        Instant rejectedAt
) {
}

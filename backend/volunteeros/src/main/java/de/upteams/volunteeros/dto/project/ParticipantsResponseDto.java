package de.upteams.volunteeros.dto.project;

import de.upteams.volunteeros.domain.enums.ParticipationStatus;

import java.time.Instant;

public record ParticipantsResponseDto(Long id,
                                      Long projectId,
                                      String projectName,
                                      Long volunteerId,
                                      String volunteerFirstName,
                                      String volunteerLastName,
                                      ParticipationStatus status,
                                      Instant joinedAt) {
}

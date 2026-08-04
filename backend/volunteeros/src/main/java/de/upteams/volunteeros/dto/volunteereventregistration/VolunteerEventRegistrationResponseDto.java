package de.upteams.volunteeros.dto.volunteereventregistration;

import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;

import java.time.LocalDateTime;

public record VolunteerEventRegistrationResponseDto(Long id,
                                                    Long eventId,
                                                    Long volunteerId,
                                                    String qrToken,
                                                    VolunteerEventRegistrationStatus status,
                                                    LocalDateTime registeredAt,
                                                    LocalDateTime checkedInAt) {
}

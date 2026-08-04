package de.upteams.volunteeros.dto.volunteereventregistration;

import java.time.LocalDateTime;

public record VolunteerCheckInResponseDto(Long registrationId,
                                          String volunteerFirstname,
                                          String volunteerLastname,
                                          LocalDateTime checkedInAt,
                                          String status) {
}

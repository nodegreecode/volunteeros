package de.upteams.volunteeros.dto.project;

import java.time.Instant;

public record ProjectCreateRequestDto(
                                      String title,
                                      String description,
                                      String location,
                                      Instant startDate,
                                      Instant endDate,
                                      int requiredVolunteers) {
}

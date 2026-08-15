package de.upteams.volunteeros.dto.project;

import java.time.Instant;

public record ProjectEditRequestDto(String title,
                                    String description,
                                    String location) {
}

package de.upteams.volunteeros.dto.project;

import java.time.Instant;

public record ProjectSearchCursor(Instant createdAt,
                                  Long id) {
}

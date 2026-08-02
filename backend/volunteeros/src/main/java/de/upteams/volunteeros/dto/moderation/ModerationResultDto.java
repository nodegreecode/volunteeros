package de.upteams.volunteeros.dto.moderation;

import de.upteams.volunteeros.domain.enums.ContentType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;

public record ModerationResultDto(Long contentItemId,
                                  ContentType contentType,
                                  Long entityId,
                                  ModerationCaseStatus status) {
}

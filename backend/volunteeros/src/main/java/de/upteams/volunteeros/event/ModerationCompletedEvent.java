package de.upteams.volunteeros.event;

import de.upteams.volunteeros.domain.enums.ContentType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;

public record ModerationCompletedEvent(Long contentItemId,
                                       ContentType contentType,
                                       Long entityId,
                                       ModerationCaseStatus status) {
}

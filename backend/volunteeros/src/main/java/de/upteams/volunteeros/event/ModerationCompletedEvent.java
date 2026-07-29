package de.upteams.volunteeros.event;

import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;

public record ModerationCompletedEvent(Long projectId, ModerationCaseStatus status) {
}

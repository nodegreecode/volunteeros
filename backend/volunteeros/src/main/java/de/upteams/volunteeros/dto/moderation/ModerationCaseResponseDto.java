package de.upteams.volunteeros.dto.moderation;

import de.upteams.volunteeros.domain.enums.AiLabelType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;

import java.time.Instant;

public record ModerationCaseResponseDto(Long id, Long contentId,
                                        String aiLabel,
                                        String caseStatus,
                                        String adminAction,
                                        String createdAt,
                                        String reviewedAt) {
}

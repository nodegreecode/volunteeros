package de.upteams.volunteeros.dto.moderation;

import de.upteams.volunteeros.domain.enums.AiLabelType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;

public record ModerationAiResponseDto(AiLabelType labelType,
                                      ModerationCaseStatus status) {
}

package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.moderation.ModerationCaseResponseDto;
import de.upteams.volunteeros.dto.moderation.ModerationCaseStatusUpdateDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ModerationService {

    List<ModerationCaseResponseDto> moderationCases();

    ModerationCaseResponseDto updateCaseStatus(Long caseId, ModerationCaseStatusUpdateDto requestDto);
}

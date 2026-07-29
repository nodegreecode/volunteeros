package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.moderation.ModerationCaseResponseDto;
import de.upteams.volunteeros.dto.moderation.ModerationCaseStatusUpdateDto;
import de.upteams.volunteeros.service.interfaces.ModerationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/moderations")
public class ModerationController {

    private final ModerationService moderationService;

    public ModerationController(ModerationService moderationService) {
        this.moderationService = moderationService;

    }

    @GetMapping("/cases")
    public List<ModerationCaseResponseDto> moderationCases() {
        return moderationService.moderationCases();
    }

    @PatchMapping("/cases/{caseId}/status")
    public ModerationCaseResponseDto updateCaseStatus(@PathVariable Long caseId, @RequestBody ModerationCaseStatusUpdateDto requestDto) {
        return moderationService.updateCaseStatus(caseId, requestDto);
    }
}

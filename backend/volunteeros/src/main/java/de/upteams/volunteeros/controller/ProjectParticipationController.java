package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.ParticipantStatusRequestDto;
import de.upteams.volunteeros.dto.project.ParticipantsResponseDto;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-participations")
public class ProjectParticipationController {

    private final ProjectService projectService;

    public ProjectParticipationController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PatchMapping("/{participationId}/withdraw")
    public ProjectParticipationStatusUpdateResponseDto withdraw(@PathVariable Long participationId) {
        return projectService.withdraw(participationId);
    }

    @PatchMapping("/{participationId}/status")
    public String changeParticipantStatus(
            @PathVariable Long participationId,
            @RequestBody ParticipantStatusRequestDto requestDto) {
        return projectService.updateParticipantStatus(participationId, requestDto);
    }

    @GetMapping("/volunteer")
    public List<ProjectParticipationResponseDto> myProjectParticipationApplications(Authentication authentication) {
        return projectService.myProjectParticipationApplications(authentication.getName());
    }

    @GetMapping("/organization")
    public List<ParticipantsResponseDto> myParticipants(Authentication authentication) {
        return projectService.myParticipants(authentication.getName());
    }
}

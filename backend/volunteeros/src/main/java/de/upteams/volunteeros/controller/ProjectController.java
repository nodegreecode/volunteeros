package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/projects")
public class ProjectController {

    private final ProjectService projectService;

    private final OrganizationService organizationService;

    public ProjectController(ProjectService projectService, OrganizationService organizationService) {
        this.projectService = projectService;
        this.organizationService = organizationService;
    }

    @PostMapping("/{organizationId}")
    public ProjectCreateResponseDto createProject(@PathVariable Long organizationId, @RequestBody ProjectCreateRequestDto requestDto) {
        return organizationService.createProject(organizationId, requestDto);
    }

    @PostMapping("/{projectId}/participants")
    public ProjectParticipationResponseDto applyForParticipation(@PathVariable Long projectId, Authentication authentication) {
        return projectService.apply(projectId, authentication);
    }


    @PatchMapping("/participants/{participationId}/status")
    public String changeParticipantStatus(
            @PathVariable Long participationId,
            @RequestBody ParticipantStatusRequestDto requestDto) {
        return projectService.changeParticipantStatus(participationId, requestDto);
    }

    @PatchMapping("participants/{participationId}/withdraw")
    public ProjectParticipationStatusUpdateResponseDto withdraw(@PathVariable Long participationId) {
        return projectService.withdraw(participationId);
    }

    @GetMapping
    public List<ProjectResponseDto> allProjects() {
        return projectService.allProjects();
    }

    @GetMapping("/active")
    public List<ProjectResponseDto> allActiveProjects() {
        return projectService.allActiveProjects();
    }

    @PatchMapping("/{projectId}")
    public ProjectEditResponseDto editProject(@PathVariable Long projectId, @RequestBody ProjectEditRequestDto requestDto, Authentication authentication) {
        return projectService.editProject(projectId, requestDto, authentication);
    }

    @PatchMapping("/{projectId}/complete")
    public ProjectEditResponseDto completeProject(@PathVariable Long projectId) {
        return projectService.completeProject(projectId);
    }

    @PatchMapping("/{projectId}/active")
    public ProjectEditResponseDto activateProject(@PathVariable Long projectId) {
        return projectService.activateProject(projectId);
    }

    @PatchMapping("/{projectId}/cancel")
    public ProjectEditResponseDto cancelProject(@PathVariable Long projectId) {
        return projectService.cancelProject(projectId);
    }

    @DeleteMapping("/{projectId}/remove")
    public void removeProject(@PathVariable Long projectId) {
        projectService.removeProject(projectId);
    }


    @GetMapping("/pending-moderation")
    public List<ProjectResponseDto> allPendingModerationProjects() {
        return projectService.allPendingModerationProjects();
    }


}

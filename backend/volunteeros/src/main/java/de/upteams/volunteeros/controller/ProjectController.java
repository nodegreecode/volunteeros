package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/{organizationId}")
    public ProjectCreateResponseDto createProject(@PathVariable Long organizationId, @RequestBody ProjectCreateRequestDto requestDto) {
        return projectService.createProject(organizationId, requestDto);
    }

    @PatchMapping("/{projectId}")
    public ProjectEditResponseDto editProject(@PathVariable Long projectId, @RequestBody ProjectEditRequestDto requestDto, Authentication authentication) {
        return projectService.editProject(projectId, requestDto, authentication.getName());
    }

    @PatchMapping("/{projectId}/active")
    public ProjectEditResponseDto activateProject(@PathVariable Long projectId) {
        return projectService.activateProject(projectId);
    }

    @PatchMapping("/{projectId}/cancel")
    public ProjectEditResponseDto cancelProject(@PathVariable Long projectId) {
        return projectService.cancelProject(projectId);
    }

    @PatchMapping("/{projectId}/complete")
    public ProjectEditResponseDto completeProject(@PathVariable Long projectId) {
        return projectService.completeProject(projectId);
    }

    @DeleteMapping("/{projectId}/remove")
    public void removeProject(@PathVariable Long projectId) {
        projectService.removeProject(projectId);
    }

    @PostMapping("/{projectId}/participants")
    public ProjectParticipationResponseDto applyForParticipation(@PathVariable Long projectId, Authentication authentication) {
        return projectService.apply(projectId, authentication.getName());
    }

    @PatchMapping("participants/{participationId}/withdraw")
    public ProjectParticipationStatusUpdateResponseDto withdraw(@PathVariable Long participationId) {
        return projectService.withdraw(participationId);
    }

    @PatchMapping("/participants/{participationId}/status")
    public String changeParticipantStatus(
            @PathVariable Long participationId,
            @RequestBody ParticipantStatusRequestDto requestDto) {
        return projectService.updateParticipantStatus(participationId, requestDto);
    }

    @GetMapping("/participants/volunteer")
    public List<ProjectParticipationResponseDto> myProjectParticipationApplications(Authentication authentication) {
        return projectService.myProjectParticipationApplications(authentication.getName());
    }

    @GetMapping("/participants/organization")
    public List<ParticipantsResponseDto> myParticipants(Authentication authentication) {
        return projectService.myParticipants(authentication.getName());
    }

    @GetMapping
    public List<ProjectCreateResponseDto> allMyProjects(Authentication authentication) {
        return projectService.allMyProjects(authentication.getName());
    }

    @GetMapping("/all")
    public List<ProjectResponseDto> allProjects() {
        return projectService.allProjects();
    }

    @GetMapping("/pending-moderation")
    public List<ProjectResponseDto> allPendingModerationProjects() {
        return projectService.allPendingModerationProjects();
    }

    @GetMapping("/active")
    public List<ProjectResponseDto> allActiveProjects() {
        return projectService.allActiveProjects();
    }

    @PostMapping("/{projectId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long projectId, @RequestParam MultipartFile image) {
        projectService.uploadProjectImage(projectId, image);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{projectId}/image")
    public ResponseEntity<?> replaceImage(@PathVariable Long projectId, @RequestParam MultipartFile image) {
        projectService.replaceProjectImage(projectId, image);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/search")
    public List<ProjectResponseDto> searchAllActiveProjects(@RequestParam String title) {
        return projectService.searchActiveProjectsByTitle(title);
    }
}

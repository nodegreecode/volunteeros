package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.domain.enums.CursorDirection;
import de.upteams.volunteeros.domain.enums.PageDirection;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import de.upteams.volunteeros.service.interfaces.ProjectEventService;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectEventService projectEventService;
    private final ProjectSearchService projectSearchService;

    public ProjectController(ProjectService projectService, ProjectEventService projectEventService, ProjectSearchService projectSearchService) {
        this.projectService = projectService;
        this.projectEventService = projectEventService;
        this.projectSearchService = projectSearchService;
    }

    @PostMapping
    public ProjectResponseDto createProject(Authentication authentication, @RequestBody ProjectCreateRequestDto requestDto) {
        return projectService.createProject(authentication.getName(), requestDto);
    }

    @PatchMapping("/{projectId}")
    public ProjectResponseDto editProject(@PathVariable Long projectId, @RequestBody ProjectEditRequestDto requestDto, Authentication authentication) {
        return projectService.editProject(projectId, requestDto, authentication.getName());
    }

    @PatchMapping("/{projectId}/activate")
    public ProjectResponseDto activateProject(@PathVariable Long projectId) {
        return projectService.activateProject(projectId);
    }

    @PatchMapping("/{projectId}/cancel")
    public ProjectResponseDto cancelProject(@PathVariable Long projectId, Authentication authentication) {
        return projectService.cancelProject(projectId, authentication.getName());
    }

    @PatchMapping("/{projectId}/complete")
    public ProjectResponseDto completeProject(@PathVariable Long projectId, Authentication authentication) {
        return projectService.completeProject(projectId, authentication.getName());
    }

    @DeleteMapping("/{projectId}/remove")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeProject(@PathVariable Long projectId, Authentication authentication) {
        projectService.removeProject(projectId, authentication.getName());
    }

    @PostMapping("/{projectId}/participation")
    public ProjectParticipationResponseDto applyForParticipation(@PathVariable Long projectId, Authentication authentication) {
        return projectService.apply(projectId, authentication.getName());
    }

    @GetMapping("/me")
    public List<ProjectResponseDto> myProjects(Authentication authentication) {
        return projectService.myProjects(authentication.getName());
    }

    @GetMapping("/{projectId}")
    public ProjectResponseDto getProject(@PathVariable Long projectId) {
        return projectService.getProjectById(projectId);
    }

    @GetMapping
    public List<ProjectResponseDto> allProjects() {
        return projectService.allProjects();
    }

    @GetMapping("/active")
    public CursorPage<ProjectResponseDto> activeProjects(@RequestParam(required = false) String cursor, @RequestParam(defaultValue = "5") int limit, @RequestParam(defaultValue = "NEXT") PageDirection direction) {
        return projectService.activeProjectsPage(cursor, limit, direction);
    }

    @GetMapping("/pending-moderation")
    public List<ProjectResponseDto> pendingModerationProjects() {
        return projectService.allPendingModerationProjects();
    }

    @PostMapping("/{projectId}/image")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadImage(@PathVariable Long projectId, Authentication authentication, @RequestParam MultipartFile image) {
        projectService.uploadProjectImage(projectId, authentication.getName(), image);
    }

    @GetMapping("/search")
    public CursorPage<ProjectResponseDto> findProjectsByTitle(@RequestParam String title,
                                                              @RequestParam(required = false) String cursor,
                                                              @RequestParam(defaultValue = "5") int limit,
                                                              @RequestParam CursorDirection direction) {
        return projectService.searchActiveProjectsByTitle(title, cursor, limit, direction);
    }

    @PostMapping("/{projectId}/events")
    public ProjectEventCreatedResponseDto createEvent(@PathVariable Long projectId, @RequestBody ProjectEventCreateRequestDto requestDto) {
        return projectEventService.createEvent(projectId, requestDto);
    }

    @GetMapping("/{projectId}/events")
    public List<ProjectEventCreatedResponseDto> getEvents(@PathVariable Long projectId) {
        return projectEventService.getProjectEventsByProject(projectId);
    }

    @GetMapping("/{projectId}/events/upcoming")
    public List<ProjectEventCreatedResponseDto> getUpcomingEvents(@PathVariable Long projectId) {
        return projectEventService.getUpcomingProjectEventsByProject(projectId);
    }

    @GetMapping("/{projectId}/participants")
    public List<ParticipantsResponseDto> getProjectParticipants(@PathVariable Long projectId) {
        return projectService.getApprovedProjectParticipants(projectId);
    }

    @DeleteMapping("/remove-index")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeProjectsIndex() {
        projectSearchService.deleteIndex();
    }

    @PostMapping("/reindex")
    @ResponseStatus(HttpStatus.OK)
    public void reindexProjects() {
        projectSearchService.reindexAll();
    }
}

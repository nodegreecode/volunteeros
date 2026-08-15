package de.upteams.volunteeros.controller;

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

    @GetMapping
    public List<ProjectCreateResponseDto> allMyProjects(Authentication authentication) {
        return projectService.allMyProjects(authentication.getName());
    }

    @GetMapping("/{projectId}")
    public ProjectResponseDto getSingleProject(@PathVariable Long projectId) {
        return projectService.getProjectById(projectId);
    }

    @GetMapping("/all")
    public List<ProjectResponseDto> allProjects() {
        return projectService.allProjects();
    }

    @Deprecated
    @GetMapping("/active")
    public List<ProjectResponseDto> allActiveProjects() {
        return projectService.allActiveProjects();
    }

    @GetMapping("/active-next")
    public CursorPage<ProjectResponseDto> nextActiveProjects(@RequestParam(required = false) String cursor, @RequestParam(defaultValue = "5") int limit) {
        return projectService.nextPage(cursor, limit);
    }

    @GetMapping("/active-previous")
    public CursorPage<ProjectResponseDto> previousActiveProjects(@RequestParam(required = false) String cursor, @RequestParam(defaultValue = "5") int limit) {
        return projectService.previousPage(cursor, limit);
    }

    @GetMapping("/pending-moderation")
    public List<ProjectResponseDto> allPendingModerationProjects() {
        return projectService.allPendingModerationProjects();
    }

    @PostMapping("/{projectId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long projectId, @RequestParam MultipartFile image) {
        projectService.uploadProjectImage(projectId, image);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Deprecated
    @PutMapping("/{projectId}/image")
    public ResponseEntity<?> replaceImage(@PathVariable Long projectId, @RequestParam MultipartFile image) {
        projectService.replaceProjectImage(projectId, image);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public CursorPage<ProjectResponseDto> findProjectsByTitle(@RequestParam String title,
                                                              @RequestParam(required = false) String cursor,
                                                              @RequestParam(defaultValue = "5") int limit) {
        return projectService.searchActiveProjectsByTitle(title, cursor, limit);
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
    public ResponseEntity<Void> removeProjectsIndex() {
        projectSearchService.deleteIndex();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reindex")
    public ResponseEntity<Void> reindexProjects() {
        projectSearchService.reindexAll();
        return ResponseEntity.ok().build();
    }
}

package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.organization.*;
import de.upteams.volunteeros.dto.project.ProjectCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationApplicationService organizationApplicationService;
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationApplicationService organizationApplicationService, OrganizationService organizationService) {
        this.organizationApplicationService = organizationApplicationService;
        this.organizationService = organizationService;
    }

    @PostMapping("/applications")
    public OrganizationApplicationResponseDto apply(@Valid @RequestBody OrganizationApplicationRequestDto requestDto) {
        return organizationApplicationService.applyForOrganization(requestDto);
    }

    @GetMapping("/applications")
    public List<OrganizationApplicationResponseDto> getOrganizationApplications() {
        return organizationApplicationService.getPendingOrganizationApplications();
    }

    @GetMapping("/{userId}/applications")
    public List<OrganizationApplicationResponseDto> getAllOrganizationApplicationsByUser(@PathVariable Long userId) {
        return organizationApplicationService.allOrganizationApplicationsByUser(userId);
    }

    @PatchMapping("/applications/{applicationId}/status")
    public OrganizationApplicationResponseDto updateOrganizationApplicationStatus(@PathVariable Long applicationId, @RequestBody OrganizationApplicationStatusUpdateRequestDto requestDto) {
        return organizationApplicationService.updateApplicationStatus(applicationId, requestDto);

    }

    @Deprecated
    @PostMapping("/{organizationId}")
    public ProjectCreateResponseDto createProject(@PathVariable Long organizationId, ProjectCreateRequestDto requestDto) {
        return organizationService.createProject(organizationId, requestDto);
    }

    @GetMapping
    public List<OrganizationResponseDto> getOrganizations() {
        return organizationService.allOrganizations();
    }

    @PatchMapping("/{organizationId}")
    public OrganizationResponseDto editOrganization(@PathVariable Long organizationId, @RequestBody OrganizationUpdateRequestDto requestDto, Authentication authentication) {
        return organizationService.editOrganization(organizationId, requestDto, authentication);
    }

}

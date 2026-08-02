package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.organization.*;
import de.upteams.volunteeros.dto.project.ProjectCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PatchMapping("/{organizationId}")
    public OrganizationResponseDto editOrganization(@PathVariable Long organizationId, @RequestBody OrganizationUpdateRequestDto requestDto, Authentication authentication) {
        return organizationService.editOrganization(organizationId, requestDto, authentication.getName());
    }

    @GetMapping
    public ResponseEntity<OrganizationResponse> getOrganization(Authentication authentication) {
        return ResponseEntity.ok(new OrganizationResponse(organizationService.getOrganization(authentication.getName())));
    }

    @GetMapping("/all")
    public List<OrganizationResponseDto> getOrganizations() {
        return organizationService.allOrganizations();
    }

}

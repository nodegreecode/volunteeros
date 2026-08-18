package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.organization.OrganizationApplicationRequestDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponse;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.response.DataResponse;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class OrganizationApplicationController {

    private final OrganizationApplicationService organizationApplicationService;

    public OrganizationApplicationController(OrganizationApplicationService organizationApplicationService) {
        this.organizationApplicationService = organizationApplicationService;
    }

    @PostMapping
    public OrganizationApplicationResponseDto apply(@Valid @RequestBody OrganizationApplicationRequestDto requestDto,
                                                    Authentication authentication) {
        return organizationApplicationService.apply(requestDto, authentication.getName());
    }

    @PatchMapping("/{applicationId}/approve")
    public OrganizationApplicationResponseDto approve(@PathVariable Long applicationId) {
        return organizationApplicationService.approve(applicationId);
    }

    @PatchMapping("/{applicationId}/reject")
    public OrganizationApplicationResponseDto reject(@PathVariable Long applicationId) {
        return organizationApplicationService.reject(applicationId);
    }

    @GetMapping
    public List<OrganizationApplicationResponseDto> getPendingOrganizationApplications() {
        return organizationApplicationService.getPendingOrganizationApplications();
    }

    @GetMapping("/{userId}")
    public List<OrganizationApplicationResponseDto> getAllOrganizationApplicationsByUser(@PathVariable Long userId) {
        return organizationApplicationService.allOrganizationApplicationsByUser(userId);
    }

    @GetMapping("/me")
    public ResponseEntity<DataResponse<OrganizationApplicationResponseDto>> myApplication(Authentication authentication) {
        return ResponseEntity.ok(new DataResponse<>(organizationApplicationService.getOrganizationApplication(authentication.getName())));
    }
}

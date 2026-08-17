package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.organization.*;
import de.upteams.volunteeros.dto.project.ProjectCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.dto.response.DataResponse;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PatchMapping("/me")
    public OrganizationResponseDto editOrganization(@RequestBody OrganizationUpdateRequestDto requestDto, Authentication authentication) {
        return organizationService.editOrganization(requestDto, authentication.getName());
    }

    @GetMapping("/me")
    public ResponseEntity<DataResponse<OrganizationResponseDto>> getOrganization(Authentication authentication) {
        return ResponseEntity.ok(new DataResponse<>(organizationService.getOrganization(authentication.getName())));
    }

    @GetMapping
    public List<OrganizationResponseDto> getOrganizations() {
        return organizationService.allOrganizations();
    }

    @PostMapping("/me/image")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadImage(@RequestParam MultipartFile image, Authentication authentication) {
        organizationService.uploadOrganizationImage(authentication.getName(), image);

    }

}

package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.OrganizationApplication;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationUpdateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface OrganizationService {
    void createOrganization(OrganizationApplication application);

    ProjectCreateResponseDto createProject(Long organizationId, ProjectCreateRequestDto requestDto);

    List<OrganizationResponseDto> allOrganizations();

    OrganizationResponseDto  editOrganization(Long organizationId, OrganizationUpdateRequestDto requestDto,  Authentication authentication);
}


package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.model.Organization;
import de.upteams.volunteeros.domain.model.OrganizationApplication;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationUpdateRequestDto;

import java.util.List;

public interface OrganizationService {
    Organization createOrganization(OrganizationApplication application);

    OrganizationResponseDto editOrganization(Long organizationId, OrganizationUpdateRequestDto requestDto, String email);

    OrganizationResponseDto getOrganization(String email);

    List<OrganizationResponseDto> allOrganizations();
}


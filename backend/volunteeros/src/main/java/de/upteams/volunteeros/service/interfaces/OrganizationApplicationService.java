package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.organization.OrganizationApplicationRequestDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationStatusUpdateRequestDto;

import java.util.List;

public interface OrganizationApplicationService {

    OrganizationApplicationResponseDto applyForOrganization(OrganizationApplicationRequestDto requestDto);

    OrganizationApplicationResponseDto updateApplicationStatus(Long applicationId, OrganizationApplicationStatusUpdateRequestDto requestDto);

    List<OrganizationApplicationResponseDto> getPendingOrganizationApplications();

    List<OrganizationApplicationResponseDto> allOrganizationApplicationsByUser(Long userId);
}

package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.organization.OrganizationApplicationRequestDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationStatusUpdateRequestDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface OrganizationApplicationService {

    OrganizationApplicationResponseDto apply(OrganizationApplicationRequestDto requestDto, String email);

    OrganizationApplicationResponseDto approve(Long applicationId);

    OrganizationApplicationResponseDto reject(Long applicationId );

    List<OrganizationApplicationResponseDto> getPendingOrganizationApplications();

    List<OrganizationApplicationResponseDto> allOrganizationApplicationsByUser(Long userId);

    OrganizationApplicationResponseDto getOrganizationApplication(String email);
}

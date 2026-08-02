package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.OrganizationApplication;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OrganizationApplicationMapper {

    @Mapping(source = "organization.id", target = "organizationId")
    OrganizationApplicationResponseDto mapEntityToOrganizationApplicationResponseDto(OrganizationApplication entity);

    List<OrganizationApplicationResponseDto> mapEntitiyToOrganizationApplicationResponseDtoList(Collection<OrganizationApplication> entities);
}

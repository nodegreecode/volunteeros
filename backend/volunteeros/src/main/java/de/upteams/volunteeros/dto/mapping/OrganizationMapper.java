package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Organization;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "owner.email", target = "email")
    @Mapping(expression = "java(entity.getOwner().getOrganizationApplications().size())", target = "applicationsCount")
    OrganizationResponseDto mapEntityToOrganizationResponseDto(Organization entity);

    List<OrganizationResponseDto> mapEntityToOrganizationResponseDtoList(Collection<Organization> entity);
}

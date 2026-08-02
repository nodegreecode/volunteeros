package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.dto.project.*;
import org.mapstruct.*;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = ImageMapper.class)
public interface ProjectMapper {

    Project mapDtoToEntity(ProjectCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ProjectEditRequestDto dto, @MappingTarget Project entity);

    @Mapping(target = "organizationId", source = "entity.organization.id")
    ProjectEditResponseDto mapEntityToEditResponseDto(Project entity);

    ProjectResponseDto mapEntityToProjectResponseDto(Project entity);

    List<ProjectResponseDto> mapEntityToProjectResponseDtoList(Collection<Project> entities);

    ProjectCreateResponseDto mapEntityToProjectCreateResponseDto(Project entity);

    List<ProjectCreateResponseDto> mapEntityToProjectCreateResponseDtoList(Collection<Project> entities);

    @Condition
    default boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }
}

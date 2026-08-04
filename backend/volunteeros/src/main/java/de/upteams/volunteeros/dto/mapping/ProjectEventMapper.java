package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.ProjectEvent;
import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectEventMapper {

    @Mapping(source = "entity.project.id", target = "projectId")
    ProjectEventCreatedResponseDto mapEntityToProjectEventCreatedResponseDto(ProjectEvent entity);
}

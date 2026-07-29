package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.ProjectParticipation;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import org.mapstruct.Condition;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectParticipationMapper {

    @Mapping(source = "user.id", target = "volunteerId")
    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.title", target = "projectTitle")
    @Mapping(source = "project.organization.orgName", target = "organizationName")
    ProjectParticipationResponseDto mapEntityToProjectParticipationResponseDto(ProjectParticipation entity);

    List<ProjectParticipationResponseDto> mapEntityToProjectParticipationResponseDtoList(Collection<ProjectParticipation> entites);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "updateAt", source = "rejectedAt")
    ProjectParticipationStatusUpdateResponseDto mapEntityToProjectParticipationStatusUpdateResponseDto(ProjectParticipation entity);

    @Condition
    default boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }
}

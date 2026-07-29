package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.UserProfile;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.project.ProjectEditRequestDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProfileMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ProfileEditRequestDto dto, @MappingTarget UserProfile entity);

    ProfileEditResponseDto mapEntityToProfileEditResponseDto(UserProfile entity);
}

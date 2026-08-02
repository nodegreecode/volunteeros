package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Skill;
import de.upteams.volunteeros.dto.skill.SkillCreateResponseDto;
import de.upteams.volunteeros.dto.skill.SkillEditResponseDto;
import de.upteams.volunteeros.dto.skill.SkillResponseDto;
import org.mapstruct.Condition;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    @Mapping(target = "userProfileId", source = "volunteer.id")
    SkillCreateResponseDto mapEntityToSkillCreateResponseDto(Skill entity);

    @Mapping(target = "userProfileId", source = "volunteer.id")
    SkillEditResponseDto mapEntityToSkillEditResponseDto(Skill entity);

    @Mapping(target = "userProfileId", source = "volunteer.id")
    SkillResponseDto mapEntityToSkillResponseDto(Skill entity);

    List<SkillResponseDto> mapEntityToSkillResponseDtoList(Collection<Skill> entities);

    @Condition
    default boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }
}

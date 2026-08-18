package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.Skill;
import de.upteams.volunteeros.dto.skill.SkillResponseDto;
import org.mapstruct.Condition;
import org.mapstruct.Mapper;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    SkillResponseDto mapEntityToSkillResponseDto(Skill entity);

    List<SkillResponseDto> mapEntityToSkillResponseDtoList(Collection<Skill> entities);

    @Condition
    default boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }
}

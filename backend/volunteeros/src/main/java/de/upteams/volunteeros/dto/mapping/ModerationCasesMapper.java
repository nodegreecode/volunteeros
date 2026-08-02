package de.upteams.volunteeros.dto.mapping;

import de.upteams.volunteeros.domain.model.ModerationCase;
import de.upteams.volunteeros.dto.moderation.ModerationCaseResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ModerationCasesMapper {

    @Mapping(target = "aiLabel", source = "entity.aiLabelType")
    @Mapping(target = "caseStatus", source = "entity.moderationCaseStatus")
    @Mapping(target = "contentId", source = "entity.content.entityId")
    ModerationCaseResponseDto mapEntityToModerationCaseResponseDto(ModerationCase entity);

    List<ModerationCaseResponseDto> mapEntityToModerationCaseResponseDtoList(Collection<ModerationCase> entities);

    default String map(Enum<?> value) {
        return value == null ? null : value.name();
    }

}

package de.upteams.volunteeros.dto.skill;

import de.upteams.volunteeros.domain.enums.SkillProficiency;

public record SkillCreateResponseDto(String id, String userProfileId, String name, SkillProficiency proficiency) {
}

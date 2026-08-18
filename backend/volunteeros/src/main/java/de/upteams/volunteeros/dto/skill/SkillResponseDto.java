package de.upteams.volunteeros.dto.skill;

import de.upteams.volunteeros.domain.enums.SkillProficiency;

public record SkillResponseDto(String id, String name, SkillProficiency proficiency) {
}

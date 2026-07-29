package de.upteams.volunteeros.dto.skill;

import de.upteams.volunteeros.domain.enums.SkillProficiency;

public record SkillCreateRequestDto(String name, SkillProficiency proficiency) {
}

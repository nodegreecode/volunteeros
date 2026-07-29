package de.upteams.volunteeros.dto.skill;

import de.upteams.volunteeros.domain.enums.SkillProficiency;

public record SkillEditRequestDto(String name, SkillProficiency proficiency) {
}

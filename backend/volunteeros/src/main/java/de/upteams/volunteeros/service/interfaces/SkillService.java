package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.skill.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface SkillService {

    SkillResponseDto addSkill(String email, SkillCreateRequestDto requestDto);

    SkillResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto, String email);

    void removeSkill(String email, Long skillId);

    List<SkillResponseDto> getSkills(String email);
}

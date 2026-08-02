package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.skill.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface SkillService {

    SkillCreateResponseDto addSkill(Authentication authentication, SkillCreateRequestDto requestDto);

    SkillEditResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto);

    void removeSkill(Long skillId, Authentication authentication);

    List<SkillResponseDto> getSkills(Authentication authentication);
}

package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.skill.SkillCreateRequestDto;
import de.upteams.volunteeros.dto.skill.SkillCreateResponseDto;
import de.upteams.volunteeros.dto.skill.SkillEditRequestDto;
import de.upteams.volunteeros.dto.skill.SkillEditResponseDto;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;

import de.upteams.volunteeros.dto.volunteer.UserResponseDto;

import org.springframework.security.core.Authentication;

public interface UserService {

    void register(UserRegistrationDto volunteerRegistrationDto);

    UserResponseDto me(Authentication authentication);

    SkillCreateResponseDto addSkill(SkillCreateRequestDto requestDto, Authentication authentication);

    SkillEditResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto);

    void removeSkill(Long skillId, Authentication authentication);


}

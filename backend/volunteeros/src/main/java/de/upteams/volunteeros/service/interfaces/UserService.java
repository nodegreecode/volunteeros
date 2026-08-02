package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.skill.SkillCreateRequestDto;
import de.upteams.volunteeros.dto.skill.SkillCreateResponseDto;
import de.upteams.volunteeros.dto.skill.SkillEditRequestDto;
import de.upteams.volunteeros.dto.skill.SkillEditResponseDto;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;

import de.upteams.volunteeros.dto.volunteer.UserResponseDto;

import org.springframework.security.core.Authentication;

public interface UserService {

    MeResponseDto getProfile(String email);

    ProfileEditResponseDto editProfile(String email, ProfileEditRequestDto requestDto);

}

package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.project.ParticipantsResponseDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface MeService {

    OrganizationApplicationResponseDto getOrganizationApplication(Authentication authentication);

    List<ProjectCreateResponseDto> getProjects(Authentication authentication);

    List<ProjectParticipationResponseDto> myParticipations(Authentication authentication);

    List<ParticipantsResponseDto> myParticipants(Authentication authentication);

    ProfileEditResponseDto editMyProfile(Authentication authentication, ProfileEditRequestDto requestDto);

    SkillCreateResponseDto addSkill(Authentication authentication, SkillCreateRequestDto requestDto);

    SkillEditResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto);

    void removeSkill(Long skillId, Authentication authentication);

    List<SkillResponseDto> getSkills(Authentication authentication);

    MeResponseDto me(Authentication authentication);

    OrganizationResponseDto getOrganization(Authentication authentication);

}

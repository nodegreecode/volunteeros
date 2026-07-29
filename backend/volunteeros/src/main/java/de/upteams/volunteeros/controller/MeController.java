package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.project.ParticipantsResponseDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.service.interfaces.MeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final MeService meService;

    public MeController(MeService meService) {
        this.meService = meService;
    }

    @GetMapping("/application")
    public ResponseEntity<OrganizationApplicationResponseDto> myApplication(Authentication authentication) {
        return ResponseEntity.ok(meService.getOrganizationApplication(authentication));
    }

    @GetMapping("/projects")
    public List<ProjectCreateResponseDto> myProjects(Authentication authentication) {
        return meService.getProjects(authentication);
    }

    @GetMapping("/participations")
    public List<ProjectParticipationResponseDto> myParticipations(Authentication authentication) {
        return meService.myParticipations(authentication);
    }

    @GetMapping("/participants")
    public List<ParticipantsResponseDto> myParticipants(Authentication authentication) {
        return meService.myParticipants(authentication);
    }

    @PatchMapping("/profile")
    public ProfileEditResponseDto editMyProfile(Authentication authentication, @RequestBody ProfileEditRequestDto requestDto) {
        return meService.editMyProfile(authentication, requestDto);
    }

    @PostMapping("/skills")
    public SkillCreateResponseDto addSkill(Authentication authentication, @RequestBody SkillCreateRequestDto requestDto) {
        return meService.addSkill(authentication, requestDto);
    }

    @PatchMapping("/skills/{skillId}")
    public SkillEditResponseDto editSkill(@PathVariable Long skillId, @RequestBody SkillEditRequestDto requestDto) {
        return meService.editSkill(skillId, requestDto);
    }

    @DeleteMapping("/skills/{skillId}")
    public void removeSkill(@PathVariable Long skillId, Authentication authentication) {
        meService.removeSkill(skillId, authentication);
    }

    @GetMapping("/skills")
    public List<SkillResponseDto> getSkills(Authentication authentication) {
        return meService.getSkills(authentication);
    }

    @GetMapping("/profile")
    public MeResponseDto me(Authentication authentication) {
        return meService.me(authentication);
    }

    @GetMapping("/organization")
    public ResponseEntity<OrganizationResponseDto> getOrganization(Authentication authentication) {
        return ResponseEntity.ok(meService.getOrganization(authentication));
    }

}

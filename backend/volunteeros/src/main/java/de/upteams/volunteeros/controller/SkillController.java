package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.response.DataResponse;
import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.service.interfaces.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public SkillResponseDto addSkill(@RequestBody SkillCreateRequestDto requestDto, Authentication authentication) {
        return skillService.addSkill(authentication.getName(), requestDto);
    }

    @PatchMapping("/{skillId}")
    public SkillResponseDto editSkill(@PathVariable Long skillId, @RequestBody SkillEditRequestDto requestDto, Authentication authentication) {
        return skillService.editSkill(skillId, requestDto, authentication.getName());
    }

    @DeleteMapping("/{skillId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeSkill(@PathVariable Long skillId, Authentication authentication) {
        skillService.removeSkill(authentication.getName(), skillId);
    }

    @GetMapping
    public List<SkillResponseDto> getSkills(Authentication authentication) {
        return skillService.getSkills(authentication.getName());
    }
}

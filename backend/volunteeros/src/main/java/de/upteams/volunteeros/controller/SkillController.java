package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.service.interfaces.SkillService;
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
    public SkillCreateResponseDto addSkill(Authentication authentication, @RequestBody SkillCreateRequestDto requestDto) {
        return skillService.addSkill(authentication, requestDto);
    }

    @PatchMapping("/{skillId}")
    public SkillEditResponseDto editSkill(@PathVariable Long skillId, @RequestBody SkillEditRequestDto requestDto) {
        return skillService.editSkill(skillId, requestDto);
    }

    @DeleteMapping("/{skillId}")
    public void removeSkill(@PathVariable Long skillId, Authentication authentication) {
        skillService.removeSkill(skillId, authentication);
    }

    @GetMapping
    public List<SkillResponseDto> getSkills(Authentication authentication) {
        return skillService.getSkills(authentication);
    }
}

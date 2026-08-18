package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.Skill;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.model.UserProfile;
import de.upteams.volunteeros.dto.mapping.SkillMapper;
import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.repository.SkillRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.SkillService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class SkillServiceImpl implements SkillService {

    private final Logger logger = LoggerFactory.getLogger(SkillServiceImpl.class);

    private static final String USER_NOT_FOUND = "User not found";

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    public SkillServiceImpl(UserRepository userRepository, SkillRepository skillRepository, SkillMapper skillMapper) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
    }

    @Override
    @Transactional
    public SkillResponseDto addSkill(String email, SkillCreateRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "SkillCreateRequestDto  cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        Skill skill = new Skill();
        skill.setName(requestDto.name());
        skill.setProficiency(requestDto.proficiency());
        user.getUserProfile().addSkill(skill);
        skillRepository.save(skill);

        return skillMapper.mapEntityToSkillResponseDto(skill);
    }

    @Override
    @Transactional
    public SkillResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto, String email) {

        Objects.requireNonNull(requestDto, "SkillCreateRequestDto  cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();

        Skill skill = userProfile.getSkills().stream()
                .filter(s -> s.getId().equals(skillId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));

        skill.setName(requestDto.name());
        skill.setProficiency(requestDto.proficiency());

        return skillMapper.mapEntityToSkillResponseDto(skill);
    }

    @Override
    @Transactional
    public void removeSkill(String email, Long skillId) {

        Objects.requireNonNull(skillId, "skillId,  cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new AuthorizationException("User not found");
        });
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> {
            logger.warn("Skill not found {}", skillId);
            return new EntityNotFoundException("Skill not found");
        });
        user.getUserProfile().removeSkill(skill);
    }

    @Override
    @Transactional
    public List<SkillResponseDto> getSkills(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User with this email not found");
        });

        List<Skill> skills = skillRepository.findAllByVolunteerId(user.getUserProfile().getId());

        return skillMapper.mapEntityToSkillResponseDtoList(skills);
    }
}

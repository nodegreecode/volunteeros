package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.*;

import de.upteams.volunteeros.domain.enums.UserStatus;
import de.upteams.volunteeros.dto.mapping.SkillMapper;
import de.upteams.volunteeros.dto.skill.SkillCreateRequestDto;
import de.upteams.volunteeros.dto.skill.SkillCreateResponseDto;
import de.upteams.volunteeros.dto.skill.SkillEditRequestDto;
import de.upteams.volunteeros.dto.skill.SkillEditResponseDto;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.dto.volunteer.UserResponseDto;

import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.RegistrationException;
import de.upteams.volunteeros.repository.*;
import de.upteams.volunteeros.service.interfaces.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    private final SkillRepository skillRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SkillMapper skillMapper;

    public UserServiceImpl(UserRepository userRepository, SkillRepository skillRepository, BCryptPasswordEncoder passwordEncoder, SkillMapper skillMapper) {
        this.userRepository = userRepository;

        this.skillRepository = skillRepository;
        this.passwordEncoder = passwordEncoder;
        this.skillMapper = skillMapper;
    }

    @Override
    public void register(UserRegistrationDto registrationDto) {

        Objects.requireNonNull(registrationDto, "registrationDto be null");

        String encodedPassword = passwordEncoder.encode(registrationDto.password());
        User user = userRepository.findByEmail(registrationDto.email()).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(registrationDto.email());
            user.setPassword(encodedPassword);
            user.setCreatedAt(Instant.now());
            user.setStatus(UserStatus.ACTIVE);
            user.setEnabled(true);

            UserProfile userProfile = new UserProfile();
            user.setUserProfile(userProfile);
            userProfile.setUser(user);
            userProfile.setCreatedAt(Instant.now());

        } else {
            throw new RegistrationException(String.format("Email %s already in use", registrationDto.email()));
        }

        userRepository.save(user);
        logger.info("User '{}' registered successfully with email '{}",
                registrationDto.email());
    }

    @Override
    public UserResponseDto me(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
                    logger.warn("User not found for authenticated user '{}'", email);
                    return new AuthorizationException("Volunteer with this email not found");
                }
        );

        UserRole role = user.getRoles()
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("User has no role"));

        return new UserResponseDto(user.getUserProfile().getFirstName(),
                user.getUserProfile().getLastName(),
                role.getRole().name());

    }

    @Override
    @Transactional
    public SkillCreateResponseDto addSkill(SkillCreateRequestDto requestDto, Authentication authentication) {

        Objects.requireNonNull(requestDto, "SkillCreateRequestDto  be null");

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found for authenticated user {}", email);
            return new AuthorizationException("Volunteer with this email not found");
        });

        Skill newSkill = new Skill();
        newSkill.setName(requestDto.name());
        user.getUserProfile().addSkill(newSkill);
        skillRepository.save(newSkill);
        return skillMapper.mapEntityToSkillCreateResponseDto(newSkill);
    }

    @Override
    @Transactional
    public SkillEditResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto) {

        Objects.requireNonNull(skillId, "skillId, be null");
        Objects.requireNonNull(requestDto, "SkillEditRequestDto be null");

        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> {
            logger.warn("Skill not found {}", skillId);
            return new EntityNotFoundException("Skill not found");
        });
        skill.setName(requestDto.name());
        return skillMapper.mapEntityToSkillEditResponseDto(skill);
    }

    @Override
    @Transactional
    public void removeSkill(Long skillId, Authentication authentication) {

        Objects.requireNonNull(skillId, "skillId, be null");

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("Volunteer not found for authenticated user {}", email);
            return new AuthorizationException("Volunteer with this email not found");
        });
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> {
            logger.warn("Skill not found {}", skillId);
            return new EntityNotFoundException("Skill not found");
        });
        user.getUserProfile().removeSkill(skill);
    }


}

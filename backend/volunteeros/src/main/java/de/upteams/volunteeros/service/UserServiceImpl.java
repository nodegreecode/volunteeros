package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.*;

import de.upteams.volunteeros.domain.enums.UserStatus;
import de.upteams.volunteeros.dto.mapping.ProfileMapper;
import de.upteams.volunteeros.dto.mapping.SkillMapper;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.skill.SkillCreateRequestDto;
import de.upteams.volunteeros.dto.skill.SkillCreateResponseDto;
import de.upteams.volunteeros.dto.skill.SkillEditRequestDto;
import de.upteams.volunteeros.dto.skill.SkillEditResponseDto;
import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.dto.volunteer.UserResponseDto;

import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.PhoneAlreadyExistsException;
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
    private final UserProfileRepository userProfileRepository;
    private final ProfileMapper profileMapper;

    public UserServiceImpl(UserRepository userRepository, UserProfileRepository userProfileRepository, ProfileMapper profileMapper) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.profileMapper = profileMapper;
    }

    @Override
    public MeResponseDto getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();

        return new MeResponseDto(
                user.getId(),
                user.getRoles()
                        .stream()
                        .map(UserRole::getRole)
                        .toList(),
                user.getUserProfile().getFirstName(),
                user.getUserProfile().getLastName(),
                userProfile.getCity(),
                userProfile.getPhone(),
                userProfile.getAvatar(),
                userProfile.getBio(),
                userProfile.getCreatedAt(),
                userProfile.getUpdatedAt());
    }

    @Override
    @Transactional
    public ProfileEditResponseDto editProfile(String email, ProfileEditRequestDto requestDto) {
        Objects.requireNonNull(requestDto, "requestDto cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found{}", email);
            return new EntityNotFoundException("User not found");
        });

        UserProfile userProfile = user.getUserProfile();

        String newPhone = requestDto.phone();

        if (newPhone != null
                && !newPhone.equals(userProfile.getPhone())
                && userProfileRepository.existsByPhone(newPhone)) {
            throw new PhoneAlreadyExistsException("Phone number already in use");
        }

        profileMapper.updateEntityFromDto(requestDto, userProfile);
        userProfile.setUpdatedAt(Instant.now());
        return profileMapper.mapEntityToProfileEditResponseDto(userProfile);
    }

}

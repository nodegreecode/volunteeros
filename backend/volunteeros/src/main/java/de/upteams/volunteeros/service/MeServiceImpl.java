package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.*;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;
import de.upteams.volunteeros.domain.enums.UserRoleType;
import de.upteams.volunteeros.dto.mapping.*;
import de.upteams.volunteeros.dto.me.ProfileEditRequestDto;
import de.upteams.volunteeros.dto.me.ProfileEditResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.project.ParticipantsResponseDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.dto.skill.*;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.PhoneAlreadyExistsException;
import de.upteams.volunteeros.repository.*;
import de.upteams.volunteeros.dto.me.MeResponseDto;
import de.upteams.volunteeros.service.interfaces.MeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MeServiceImpl implements MeService {

    private final Logger logger = LoggerFactory.getLogger(MeServiceImpl.class);
    private static final String USER_NOT_FOUND = "User not found";

    private final UserRepository userRepository;
    private final OrganizationApplicationRepository applicationRepository;
    private final OrganizationApplicationMapper applicationMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final ProjectParticipationRepository projectParticipationRepository;
    private final ProjectParticipationMapper projectParticipationMapper;
    private final ProfileMapper profileMapper;
    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;
    private final OrganizationMapper organizationMapper;
    private final OrganizationRepository organizationRepository;
    private final UserProfileRepository userProfileRepository;


    public MeServiceImpl(UserRepository userRepository, OrganizationApplicationRepository applicationRepository, OrganizationApplicationMapper applicationMapper, ProjectMapper projectMapper, ProjectRepository projectRepository, ProjectParticipationRepository projectParticipationRepository, ProjectParticipationMapper projectParticipationMapper, ProfileMapper profileMapper, SkillRepository skillRepository, SkillMapper skillMapper, OrganizationMapper organizationMapper, OrganizationRepository organizationRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.applicationMapper = applicationMapper;
        this.projectMapper = projectMapper;
        this.projectRepository = projectRepository;
        this.projectParticipationRepository = projectParticipationRepository;
        this.projectParticipationMapper = projectParticipationMapper;
        this.profileMapper = profileMapper;
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
        this.organizationMapper = organizationMapper;
        this.organizationRepository = organizationRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public OrganizationApplicationResponseDto getOrganizationApplication(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.info(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });
        Optional<OrganizationApplication> application = applicationRepository
                .findFirstByUserIdOrderBySubmittedAtDesc(user.getId());
        if (application.isEmpty()) {
            logger.info("No active application found for user {}", email);
            return null;
        }

        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application.get());
    }

    @Override
    public List<ProjectCreateResponseDto> getProjects(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        List<Project> projects = new ArrayList<>();

        boolean isOrganization = user.getRoles()
                .stream()
                .anyMatch(r -> r.getRole() == UserRoleType.ROLE_ORGANIZATION);

        if (isOrganization) {
            projects.addAll(
                    projectRepository.findByOrganizationOwnerId(user.getId())
            );
        } else {
            projects.addAll(
                    projectRepository.findApprovedProjectsByVolunteerId(user.getId(), ParticipationStatus.APPROVED)
            );
        }

        return projectMapper.mapEntityToProjectCreateResponseDtoList(projects);
    }

    @Override
    public List<ProjectParticipationResponseDto> myParticipations(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        return projectParticipationRepository.findParticipationsByUserId(user.getId());
    }

    @Override
    public List<ParticipantsResponseDto> myParticipants(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        return projectParticipationRepository.findParticipantsByOrganizationId(user.getOrganization().getId());
    }

    @Override
    @Transactional
    public ProfileEditResponseDto editMyProfile(Authentication authentication, ProfileEditRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "requestDto cannot be null");

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
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

    @Override
    @Transactional
    public SkillCreateResponseDto addSkill(Authentication authentication, SkillCreateRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "SkillCreateRequestDto  cannot be null");

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User not found");
        });

        Skill skill = new Skill();
        skill.setName(requestDto.name());
        skill.setProficiency(requestDto.proficiency());
        user.getUserProfile().addSkill(skill);
        skillRepository.save(skill);

        return skillMapper.mapEntityToSkillCreateResponseDto(skill);
    }

    @Override
    @Transactional
    public SkillEditResponseDto editSkill(Long skillId, SkillEditRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "SkillCreateRequestDto  cannot be null");

        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", skillId);
            return new EntityNotFoundException("Skill not found");
        });
        skill.setName(requestDto.name());
        return skillMapper.mapEntityToSkillEditResponseDto(skill);
    }

    @Override
    @Transactional
    public void removeSkill(Long skillId, Authentication authentication) {

        Objects.requireNonNull(skillId, "skillId,  cannot be null");

        String email = authentication.getName();
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
    public List<SkillResponseDto> getSkills(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
            return new EntityNotFoundException("User with this email not found");
        });

        List<Skill> skills = skillRepository.findAllByVolunteerId(user.getUserProfile().getId());

        return skillMapper.mapEntityToSkillResponseDtoList(skills);
    }

    @Override
    public MeResponseDto me(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(USER_NOT_FOUND + "{}", email);
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
    public OrganizationResponseDto getOrganization(Authentication authentication) {
        String email = authentication.getName();

        Optional<Organization> organization = organizationRepository.findByOwnerEmail(email);

        if (organization.isEmpty()) {
            logger.info("No organization found for user {}", email);
            return null;
        }

        return organizationMapper.mapEntityToOrganizationResponseDto(organization.get());
    }
}

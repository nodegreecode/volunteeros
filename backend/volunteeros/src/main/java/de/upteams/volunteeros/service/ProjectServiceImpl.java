package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.ProjectParticipation;
import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;

import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.dto.mapping.ProjectMapper;
import de.upteams.volunteeros.dto.mapping.ProjectParticipationMapper;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import de.upteams.volunteeros.exceptions.types.*;
import de.upteams.volunteeros.repository.*;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final ProjectParticipationRepository participationRepository;
    private final ProjectParticipationMapper projectParticipationMapper;
    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              ProjectMapper projectMapper,
                              ProjectParticipationRepository participationRepository,
                              ProjectParticipationMapper projectParticipationMapper,
                              UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.participationRepository = participationRepository;
        this.projectParticipationMapper = projectParticipationMapper;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ProjectParticipationStatusUpdateResponseDto withdraw(Long participationId) {

        Objects.requireNonNull(participationId, "participationId cannot be null");

        ProjectParticipation participation = participationRepository.findById(participationId).orElseThrow(() -> {
            logger.warn("Participation not found {}", participationId);
            return new EntityNotFoundException("ProjectParticipation with this email not found");
        });

        participation.setStatus(ParticipationStatus.CANCELLED);
        participation.setRejectedAt(Instant.now());
        return projectParticipationMapper.mapEntityToProjectParticipationStatusUpdateResponseDto(participation);
    }

    @Override
    @Transactional
    public String changeParticipantStatus(Long participationId, ParticipantStatusRequestDto requestDto) {

        Objects.requireNonNull(participationId, "Participation Id id cannot be null");
        Objects.requireNonNull(requestDto, "ParticipantStatusRequestDto cannot be null");

        ParticipationStatus newStatus = requestDto.status();

        if (newStatus == ParticipationStatus.PENDING) {
            throw new InvalidPaticipationStatusException("Cannot set status to PENDING");
        }

        ProjectParticipation participation = participationRepository.findById(participationId).orElseThrow(() -> {
            logger.warn("Participation not found:  participationId={}", participationId);
            return new EntityNotFoundException("Entity not found");
        });

        participation.setStatus(newStatus);
        return newStatus.name();
    }

    @Override
    public List<ProjectResponseDto> allProjects() {
        System.out.println("Fetching projects from database...");
        return projectMapper.mapEntityToProjectResponseDtoList(projectRepository.findAll());
    }

    @Override
    public List<ProjectResponseDto> allPendingModerationProjects() {
        return projectMapper.mapEntityToProjectResponseDtoList(projectRepository.findAllByStatus(ProjectStatus.PENDING_MODERATION));
    }

    @Override
    @Cacheable(value = "projects", key = "'active'")
    public List<ProjectResponseDto> allActiveProjects() {
        return projectMapper.mapEntityToProjectResponseDtoList(projectRepository.findAllByStatus(ProjectStatus.ACTIVE));
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto completeProject(Long projectId) {
        Objects.requireNonNull(projectId, "Project id cannot be null");

        Project entity = projectRepository.findById(projectId).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });

        entity.complete();

        logger.info("Project status updated {}", projectId);
        return projectMapper.mapEntityToEditResponseDto(entity);
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public void removeProject(Long projectId) {
        Objects.requireNonNull(projectId, "Project id cannot be null");

        Project entity = projectRepository.findById(projectId).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });

        projectRepository.delete(entity);
        logger.info("Project deleted: {}", projectId);
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto activateProject(Long projectId) {
        Objects.requireNonNull(projectId, "Project id cannot be null");

        Project entity = projectRepository.findById(projectId).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });

        entity.activate();

        return projectMapper.mapEntityToEditResponseDto(entity);
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto cancelProject(Long projectId) {
        Objects.requireNonNull(projectId, "Project id cannot be null");

        Project entity = projectRepository.findById(projectId).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });
        entity.cancel();

        return projectMapper.mapEntityToEditResponseDto(entity);
    }

    @Override
    @Transactional
    public ProjectParticipationResponseDto apply(Long projectId, Authentication authentication) {

        Objects.requireNonNull(projectId, "Project id cannot be null");

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("Volunteer not found for authenticated user {}", email);
            return new AuthorizationException("Volunteer with this email not found");
        });

        Project project = projectRepository.findByIdAndStatus(projectId, ProjectStatus.ACTIVE).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });

        ProjectParticipation newParticipation = new ProjectParticipation();
        newParticipation.setStatus(ParticipationStatus.PENDING);

        project.addParticipation(newParticipation);
        currentUser.addParticipation(newParticipation);

        try {
            participationRepository.save(newParticipation);
        } catch (Exception e) {
            throw new ParticipationAlreadyExistException("User already has an active project application");
        }



        return projectParticipationMapper.mapEntityToProjectParticipationResponseDto(newParticipation);
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto editProject(Long projectId, ProjectEditRequestDto requestDto, Authentication authentication) {

        Objects.requireNonNull(projectId, "Project id cannot be null");
        Objects.requireNonNull(requestDto, "ProjectEditRequestDto cannot be null");

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        Long organizationId = user.getOrganization().getId();

        Project entity = projectRepository.findByIdAndOrganizationId(projectId, organizationId)
                .orElseThrow(() -> new ProjectEditDeniedException("Access denied"));

        projectMapper.updateEntityFromDto(requestDto, entity);
        logger.info("Project updated {}", projectId);
        return projectMapper.mapEntityToEditResponseDto(entity);
    }


}

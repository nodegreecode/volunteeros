package de.upteams.volunteeros.service;

import co.elastic.clients.elasticsearch._types.SortOrder;
import de.upteams.volunteeros.domain.enums.*;

import de.upteams.volunteeros.domain.model.*;
import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;
import de.upteams.volunteeros.dto.mapping.ProjectMapper;
import de.upteams.volunteeros.dto.mapping.ProjectParticipationMapper;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.participation.ProjectParticipationStatusUpdateResponseDto;
import de.upteams.volunteeros.dto.project.*;
import de.upteams.volunteeros.event.ProjectCreatedEvent;
import de.upteams.volunteeros.exceptions.types.*;
import de.upteams.volunteeros.repository.*;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import de.upteams.volunteeros.service.interfaces.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private final OrganizationRepository organizationRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final ProjectParticipationRepository participationRepository;
    private final ProjectParticipationMapper projectParticipationMapper;
    private final UserRepository userRepository;
    private final ProjectParticipationRepository projectParticipationRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final ProjectSearchService projectSearchService;
    private final CursorService cursorService;


    public ProjectServiceImpl(OrganizationRepository organizationRepository, ProjectRepository projectRepository,
                              ProjectMapper projectMapper,
                              ProjectParticipationRepository participationRepository,
                              ProjectParticipationMapper projectParticipationMapper,
                              UserRepository userRepository,
                              ProjectParticipationRepository projectParticipationRepository,
                              ApplicationEventPublisher eventPublisher,
                              ImageService imageService,
                              ImageRepository imageRepository,
                              ProjectSearchService projectSearchService, CursorService cursorService) {
        this.organizationRepository = organizationRepository;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.participationRepository = participationRepository;
        this.projectParticipationMapper = projectParticipationMapper;
        this.userRepository = userRepository;
        this.projectParticipationRepository = projectParticipationRepository;
        this.eventPublisher = eventPublisher;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.projectSearchService = projectSearchService;

        this.cursorService = cursorService;
    }

    @Override
    @Transactional
    public ProjectCreateResponseDto createProject(Long organizationId, ProjectCreateRequestDto requestDto) {
        Objects.requireNonNull(organizationId, "OrganizationId cannot be null");
        Objects.requireNonNull(requestDto, "ProjectCreateRequestDto cannot be null");

        Organization organization = organizationRepository.findById(organizationId).orElseThrow(() -> {
            logger.warn("Organization {} not found", organizationId);
            return new AuthorizationException("Volunteer with this email not found");
        });

        Project project = new Project();
        project.setOrganization(organization);
        project.setTitle(requestDto.title());
        project.setDescription(requestDto.description());
        project.setLocation(requestDto.location());
        project.setStartDate(requestDto.startDate());
        project.setEndDate(requestDto.endDate());
        project.setStatus(ProjectStatus.DRAFT);
        project.setRequiredVolunteers(requestDto.requiredVolunteers());
        project.setCreatedAt(Instant.now());
        projectRepository.save(project);

        logger.info("Project {} created", project.getId());

        eventPublisher
                .publishEvent(
                        new ProjectCreatedEvent(project.getId())
                );

        return projectMapper.mapEntityToProjectCreateResponseDto(project);
    }

    @Override
    @Transactional
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto editProject(Long projectId, ProjectEditRequestDto requestDto, String email) {

        Objects.requireNonNull(projectId, "Project id cannot be null");
        Objects.requireNonNull(requestDto, "ProjectEditRequestDto cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        Long organizationId = user.getOrganization().getId();

        Project entity = projectRepository.findByIdAndOrganizationId(projectId, organizationId)
                .orElseThrow(() -> new ProjectEditDeniedException("Access denied"));

        projectMapper.updateEntityFromDto(requestDto, entity);
        logger.info("Project updated {}", projectId);

        projectSearchService.index(entity); // Update elastic search ProjectDocument

        return projectMapper.mapEntityToEditResponseDto(entity);
    }

    @Override
    @Transactional
    public ProjectParticipationResponseDto apply(Long projectId, String email) {

        Objects.requireNonNull(projectId, "Project id cannot be null");

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
    @CacheEvict(value = "projects", allEntries = true)
    public ProjectEditResponseDto activateProject(Long projectId) {

        Objects.requireNonNull(projectId, "Project id cannot be null");

        Project entity = projectRepository.findById(projectId).orElseThrow(() -> {
            logger.warn("Project not found: {}", projectId);
            return new EntityNotFoundException("Entity not found");
        });

        entity.activate();

        projectSearchService.index(entity); // Update elastic search ProjectDocument

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

        projectSearchService.index(entity); // Update elastic search ProjectDocument

        return projectMapper.mapEntityToEditResponseDto(entity);
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

        projectSearchService.index(entity); // Update elastic search ProjectDocument

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

        projectSearchService.index(entity); // Update elastic search ProjectDocument

        logger.info("Project deleted: {}", projectId);
    }

    @Override
    @Transactional
    public String updateParticipantStatus(Long participationId, ParticipantStatusRequestDto requestDto) {

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
    public List<ProjectParticipationResponseDto> myProjectParticipationApplications(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        return projectParticipationRepository.findParticipationsByUserId(user.getId());
    }

    @Override
    public List<ParticipantsResponseDto> myParticipants(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        if (user.getOrganization() == null) {
            logger.info("User {} has no organization yet", email);
            return Collections.emptyList();
        }

        return projectParticipationRepository.findParticipantsByOrganizationId(user.getOrganization().getId());
    }

    @Override
    public List<ProjectCreateResponseDto> allMyProjects(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
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
    public List<ProjectResponseDto> allProjects() {
        return projectMapper.mapEntityToProjectResponseDtoList(projectRepository.findAll());
    }

    @Override
    public ProjectResponseDto getProjectById(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        return projectMapper.mapEntityToProjectResponseDto(project);
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

    @Transactional
    public void uploadProjectImage(Long projectId, MultipartFile file) {

        Objects.requireNonNull(projectId, "ProjectId cannot be null");
        Objects.requireNonNull(file, "Image cannot be null");

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Image projectImage = project.getImage();

        String oldPublicId = projectImage != null ? projectImage.getPublicId() : null;

        ImageUploadResponseDto upload = imageService.upload(file, ImageFolder.PROJECT);

        try {
            if (projectImage == null) {
                projectImage = new Image();
            }

            projectImage.setPublicId(upload.publicId());
            projectImage.setUrl(upload.secureUrl());
            projectImage.setContentType(file.getContentType());
            projectImage.setOriginalFilename(file.getOriginalFilename());
            projectImage.setSize(file.getSize());
            projectImage.setUploadedAt(Instant.now());

            project.setImage(projectImage);
        } catch (Exception e) {
            imageService.delete(upload.publicId());
            throw new ProjectImageUploadException("Failed to save image");
        }

        if (oldPublicId != null) {
            imageService.delete(oldPublicId);
        }

    }

    @Deprecated
    @Transactional
    public void replaceProjectImage(Long projectId, MultipartFile file) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Image image = project.getImage();

        if (image == null) {
            throw new EntityNotFoundException("Project has no image");
        }

        ImageUploadResponseDto upload = imageService.replace(
                file,
                image.getPublicId(),
                ImageFolder.PROJECT
        );

        image.setPublicId(upload.publicId());
        image.setUrl(upload.secureUrl());
        image.setContentType(file.getContentType());
        image.setOriginalFilename(file.getOriginalFilename());
        image.setSize(file.getSize());
        image.setUploadedAt(Instant.now());

        imageRepository.save(image);
    }

    @Override
    public CursorPage<ProjectResponseDto> searchActiveProjectsByTitle(String title, String cursor, int limit, CursorDirection direction) {
        return projectSearchService.search(title, cursor, limit, direction);
    }


    @Override
    public List<ParticipantsResponseDto> getApprovedProjectParticipants(Long projectId) {
        return projectParticipationRepository.findAllByProjectIdAndStatus(projectId, ParticipationStatus.APPROVED);
    }

    @Override
    public CursorPage<ProjectResponseDto> nextPage(String cursor, int limit) {

        Pageable pageable = PageRequest.of(0, limit + 1);

        List<Project> projects;

        if (cursor == null) {
            projects = projectRepository.findFirstPage(ProjectStatus.ACTIVE, pageable);
        } else {

            ProjectSearchCursor decodedCursor = cursorService.decode(cursor);

            projects = projectRepository.findNextPage(
                    ProjectStatus.ACTIVE,
                    decodedCursor.createdAt(),
                    decodedCursor.id(),
                    pageable);
        }

        boolean hasNextPage = projects.size() > limit;

        if (hasNextPage) {
            projects = projects.subList(0, limit);
        }

        String previousCursor = null;
        String nextCursor = null;

        if (!projects.isEmpty()) {

            if (cursor != null) {
                Project firstProject = projects.getFirst();
                previousCursor = cursorService.encode(
                        new ProjectSearchCursor(
                                firstProject.getCreatedAt(),
                                firstProject.getId()
                        )
                );
            }

            if (hasNextPage) {
                Project lastProject = projects.getLast();

                nextCursor = cursorService.encode(new ProjectSearchCursor(
                        lastProject.getCreatedAt(),
                        lastProject.getId()
                ));
            }
        }

        List<ProjectResponseDto> result = projects.stream()
                .map(projectMapper::mapEntityToProjectResponseDto)
                .toList();

        return new CursorPage<>(result, nextCursor, previousCursor);

    }

    @Override
    public CursorPage<ProjectResponseDto> previousPage(String cursor, int limit) {

        if (cursor == null) {
            throw new InvalidCursorException("Cursor is required when requesting the previous page");
        }

        Pageable pageable = PageRequest.of(0, limit + 1);

        ProjectSearchCursor decodedCursor = cursorService.decode(cursor);

        List<Project> projects = projectRepository.findPreviousPage(
                ProjectStatus.ACTIVE,
                decodedCursor.createdAt(),
                decodedCursor.id(),
                pageable);

        boolean hasPreviousPage = projects.size() > limit;

        if (hasPreviousPage) {
            projects = projects.subList(0, limit);
        }

        Collections.reverse(projects); // turn back to DESC

        String previousCursor = null;
        String nextCursor = null;

        if (!projects.isEmpty()) {

            if (hasPreviousPage) {
                Project firstProject = projects.getFirst();

                previousCursor = cursorService.encode(
                        new ProjectSearchCursor(
                                firstProject.getCreatedAt(),
                                firstProject.getId()
                        ));

            }

            Project lastProject = projects.getLast();

            nextCursor = cursorService.encode(
                    new ProjectSearchCursor(
                            lastProject.getCreatedAt(),
                            lastProject.getId()
                    )
            );

        }


        List<ProjectResponseDto> result = projects.stream()
                .map(projectMapper::mapEntityToProjectResponseDto)
                .toList();


        return new CursorPage<>(
                result,
                nextCursor,
                previousCursor
        );
    }

}

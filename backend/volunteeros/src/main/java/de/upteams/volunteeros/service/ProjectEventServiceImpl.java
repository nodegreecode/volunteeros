package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.enums.ProjectEventStatus;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;
import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.model.ProjectEvent;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;
import de.upteams.volunteeros.dto.mapping.ProjectEventMapper;
import de.upteams.volunteeros.dto.mapping.VolunteerEventRegistrationMapper;
import de.upteams.volunteeros.dto.project.ProjectEventCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectEventCreatedResponseDto;
import de.upteams.volunteeros.dto.projectevent.ProjectEventUpdateRequestDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.exceptions.types.ProjectEventStatusException;
import de.upteams.volunteeros.exceptions.types.ProjectNotActiveException;
import de.upteams.volunteeros.exceptions.types.VolunteerEventRegistrationException;
import de.upteams.volunteeros.repository.ProjectEventRepository;
import de.upteams.volunteeros.repository.ProjectRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.repository.VolunteerEventRegistrationRepository;
import de.upteams.volunteeros.service.interfaces.ProjectEventService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ProjectEventServiceImpl implements ProjectEventService {

    private final Logger logger = LoggerFactory.getLogger(ProjectEventServiceImpl.class);

    private final ProjectRepository projectRepository;
    private final ProjectEventRepository projectEventRepository;
    private final ProjectEventMapper projectEventMapper;
    private final UserRepository userRepository;
    private final VolunteerEventRegistrationMapper volunteerEventRegistrationMapper;
    private final VolunteerEventRegistrationRepository volunteerEventRegistrationRepository;

    public ProjectEventServiceImpl(ProjectRepository projectRepository, ProjectEventRepository projectEventRepository, ProjectEventMapper projectEventMapper, UserRepository userRepository, VolunteerEventRegistrationMapper volunteerEventRegistrationMapper, VolunteerEventRegistrationRepository volunteerEventRegistrationRepository) {
        this.projectRepository = projectRepository;
        this.projectEventRepository = projectEventRepository;
        this.projectEventMapper = projectEventMapper;
        this.userRepository = userRepository;
        this.volunteerEventRegistrationMapper = volunteerEventRegistrationMapper;
        this.volunteerEventRegistrationRepository = volunteerEventRegistrationRepository;
    }

    @Override
    @Transactional
    public ProjectEventCreatedResponseDto createEvent(Long projectId, ProjectEventCreateRequestDto requestDto) {

        Objects.requireNonNull(projectId, "ProjectId cannot be null");
        Objects.requireNonNull(requestDto, "ProjectEventCreateRequestDto cannot be null");

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("Project not found"));
        if (project.getStatus() != ProjectStatus.ACTIVE) {
            throw new ProjectNotActiveException("Cannot create an event for a project that is not active.");
        }
        ProjectEvent projectEvent = createProjectEvent(requestDto);
        project.addEvent(projectEvent);
        projectRepository.save(project);

        return projectEventMapper.mapEntityToProjectEventCreatedResponseDto(projectEvent);
    }

    @Override
    public List<ProjectEventCreatedResponseDto> getProjectEventsByProject(Long projectId) {

        Objects.requireNonNull(projectId, "ProjectId cannot be null");

        return projectEventRepository.findAllByProjectId(projectId)
                .stream()
                .map(projectEventMapper::mapEntityToProjectEventCreatedResponseDto)
                .toList();
    }

    @Override
    public List<ProjectEventCreatedResponseDto> getUpcomingProjectEventsByProject(Long projectId) {

        Objects.requireNonNull(projectId, "ProjectId cannot be null");

        return projectEventRepository.findAllByProjectIdAndDateGreaterThanEqual(projectId, LocalDate.now())
                .stream()
                .map(projectEventMapper::mapEntityToProjectEventCreatedResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public ProjectEventCreatedResponseDto editEvent(Long eventId, ProjectEventUpdateRequestDto requestDto, String email) {

        Objects.requireNonNull(eventId, "EventId cannot be null");
        Objects.requireNonNull(requestDto, "ProjectEventUpdateRequestDto cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        ProjectEvent projectEvent = projectEventRepository.findByIdAndProjectOrganizationId(eventId, user.getOrganization().getId())
                .orElseThrow(() -> new EntityNotFoundException("Project event not found"));
        projectEvent.setTitle(requestDto.title());
        projectEvent.setDescription(requestDto.description());
        projectEvent.setDate(requestDto.date());
        projectEvent.setStartTime(requestDto.startTime());
        projectEvent.setEndTime(requestDto.endTime());
        projectEvent.setLocation(requestDto.location());
        projectEvent.setCapacity(requestDto.capacity());

        return projectEventMapper.mapEntityToProjectEventCreatedResponseDto(projectEvent);
    }

    @Override
    public ProjectEventCreatedResponseDto cancelEvent(Long eventId, String email) {

        Objects.requireNonNull(eventId, "EventId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        ProjectEvent projectEvent = projectEventRepository.findByIdAndProjectOrganizationId(eventId, user.getOrganization().getId())
                .orElseThrow(() -> new EntityNotFoundException("Project event not found"));

        if (!projectEvent.getStatus().canTransitionTo(ProjectEventStatus.CANCELLED)) {
            throw new ProjectEventStatusException("Invalid event status transition");
        }

        projectEvent.setStatus(ProjectEventStatus.CANCELLED);

        return projectEventMapper.mapEntityToProjectEventCreatedResponseDto(projectEvent);
    }

    @Override
    public ProjectEventCreatedResponseDto completeEvent(Long eventId, String email) {

        Objects.requireNonNull(eventId, "EventId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        ProjectEvent projectEvent = projectEventRepository.findByIdAndProjectOrganizationId(eventId, user.getOrganization().getId())
                .orElseThrow(() -> new EntityNotFoundException("Project event not found"));

        if (!projectEvent.getStatus().canTransitionTo(ProjectEventStatus.COMPLETED)) {
            throw new ProjectEventStatusException("Invalid event status transition");
        }

        projectEvent.setStatus(ProjectEventStatus.COMPLETED);

        return projectEventMapper.mapEntityToProjectEventCreatedResponseDto(projectEvent);
    }

    @Override
    @Transactional
    public VolunteerEventRegistrationResponseDto register(Long eventId, String email) {

        Objects.requireNonNull(eventId, "EventId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        ProjectEvent event = projectEventRepository.findById(eventId).orElseThrow();

        if (event.getStatus() != ProjectEventStatus.PUBLISHED) {
            throw new ProjectEventStatusException("Invalid event status. No registration possible");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        if (volunteerEventRegistrationRepository.existsByEventIdAndVolunteerId(eventId, user.getId())) {
            throw new VolunteerEventRegistrationException("You are already registered for this event");
        }

        if (volunteerEventRegistrationRepository.countByEventIdAndStatus(eventId, VolunteerEventRegistrationStatus.REGISTERED) >= event.getCapacity()) {
            throw new VolunteerEventRegistrationException("Event is full");
        }

        VolunteerEventRegistration eventRegistration = new VolunteerEventRegistration();
        eventRegistration.setEvent(event);
        eventRegistration.setVolunteer(user);
        eventRegistration.setQrToken(UUID.randomUUID().toString());
        eventRegistration.setStatus(VolunteerEventRegistrationStatus.REGISTERED);
        eventRegistration.setRegisteredAt(LocalDateTime.now());

        volunteerEventRegistrationRepository.save(eventRegistration);

        return volunteerEventRegistrationMapper.mapEntityToVolunteerEventRegistrationResponseDto(eventRegistration);
    }

    private ProjectEvent createProjectEvent(ProjectEventCreateRequestDto requestDto) {

        ProjectEvent projectEvent = new ProjectEvent();
        projectEvent.setTitle(requestDto.title());
        projectEvent.setDescription(requestDto.description());
        projectEvent.setDate(requestDto.date());
        projectEvent.setStartTime(requestDto.startTime());
        projectEvent.setEndTime(requestDto.endTime());
        projectEvent.setLocation(requestDto.location());
        projectEvent.setCapacity(requestDto.capacity());
        projectEvent.setStatus(ProjectEventStatus.PUBLISHED);

        return projectEvent;
    }
}

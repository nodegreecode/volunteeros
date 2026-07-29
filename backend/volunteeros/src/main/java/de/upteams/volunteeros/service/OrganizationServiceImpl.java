package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.*;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.dto.mapping.OrganizationMapper;
import de.upteams.volunteeros.dto.mapping.ProjectMapper;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationUpdateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateRequestDto;
import de.upteams.volunteeros.dto.project.ProjectCreateResponseDto;
import de.upteams.volunteeros.event.ProjectCreatedEvent;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.exceptions.types.OrganizationNotFounException;
import de.upteams.volunteeros.repository.OrganizationRepository;
import de.upteams.volunteeros.repository.ProjectRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.OrganizationService;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    private final Logger logger = LoggerFactory.getLogger(OrganizationServiceImpl.class);

    private final OrganizationRepository organizationRepository;
    private final OrganizationMapper organizationMapper;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final UserRepository userRepository;


    public OrganizationServiceImpl(OrganizationRepository organizationRepository, OrganizationMapper organizationMapper, ProjectRepository projectRepository, ProjectMapper projectMapper, ApplicationEventPublisher eventPublisher, UserRepository userRepository) {
        this.organizationRepository = organizationRepository;
        this.organizationMapper = organizationMapper;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.eventPublisher = eventPublisher;
        this.userRepository = userRepository;
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createOrganization(OrganizationApplication application) {

        Objects.requireNonNull(application, "Application cannot be null");

        if (organizationRepository.existsByOwnerId(application.getUser().getId())) {
            logger.info("Organization '{}' already exists.", application.getOrganizationName());
            return;
        }

        OrganizationMember organizationMember = new OrganizationMember();
        organizationMember.setUser(application.getUser());
        organizationMember.setMemberRole(application.getMemberRole());
        organizationMember.setJoinedAt(Instant.now());

        Organization organization = new Organization();
        organization.setOrgForm(application.getOrganizationForm());
        organization.setOrgName(application.getOrganizationName());
        organization.setDescription(application.getDescription());
        organization.setCreatedAt(Instant.now());

        organization.setPhone(application.getPhone());
        organization.setWebsite(application.getWebsite());
        organization.setRegistrationCountry(application.getRegistrationCountry());
        organization.setCity(application.getCity());
        organization.setStreet(application.getStreet());
        organization.setEmail(application.getEmail());
        organization.setRegistrationNumber(application.getRegistrationNumber());

        organizationMember.setOrganization(organization);
        organization.getMembers().add(organizationMember);

        organization.setOwner(application.getUser());

        organizationRepository.save(organization);
        logger.info("Organization {} and Organization Member {} created", organization.getId(), organizationMember.getId());
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
                        new ProjectCreatedEvent(project,
                                project.getDescription())
                );

        return projectMapper.mapEntityToProjectCreateResponseDto(project);
    }

    @Override
    public List<OrganizationResponseDto> allOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();
        return organizationMapper.mapEntityToOrganizationResponseDtoList(organizations);
    }

    @Override
    @Transactional
    public OrganizationResponseDto editOrganization(Long organizationId, OrganizationUpdateRequestDto requestDto, Authentication authentication) {

        Objects.requireNonNull(organizationId, "OrganizationId cannot be null");
        Objects.requireNonNull(requestDto, "OrganizationUpdateRequestDto cannot be null");

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        Organization organization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new OrganizationNotFounException("Organization not found"));

        if (!Objects.equals(organization.getOwner(), user)) {
            logger.warn("User {} tried to edit organization {}", email, organizationId);
            throw new AccessDeniedException("Only owner can edit organization");
        }

        organization.setOrgForm(requestDto.orgForm());
        organization.setOrgName(requestDto.orgName());
        organization.setCity(requestDto.city());
        organization.setPhone(requestDto.phone());
        organization.setAvatar(requestDto.avatar());
        organization.setDescription(requestDto.description());
        organization.setWebsite(requestDto.website());
        logger.info("Organization information updated {}", organizationId);
        return organizationMapper.mapEntityToOrganizationResponseDto(organization);
    }
}

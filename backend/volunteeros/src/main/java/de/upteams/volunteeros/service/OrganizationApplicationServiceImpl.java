package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.Organization;
import de.upteams.volunteeros.domain.model.OrganizationApplication;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import de.upteams.volunteeros.dto.mapping.OrganizationApplicationMapper;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationRequestDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.event.OrganizationApplicationCreatedEvent;
import de.upteams.volunteeros.exceptions.types.ApplicationAlreadyExistException;
import de.upteams.volunteeros.exceptions.types.DuplicateOrganizationException;
import de.upteams.volunteeros.exceptions.types.OrganizationApplicationStatusException;
import de.upteams.volunteeros.repository.OrganizationApplicationRepository;
import de.upteams.volunteeros.repository.OrganizationRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Service
public class OrganizationApplicationServiceImpl implements OrganizationApplicationService {

    private final Logger logger = LoggerFactory.getLogger(OrganizationApplicationServiceImpl.class);

    private final OrganizationApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final OrganizationApplicationMapper applicationMapper;
    private final ApplicationEventPublisher eventPublisher;

    private final OrganizationService organizationService;
    private final OrganizationRepository organizationRepository;

    public OrganizationApplicationServiceImpl(OrganizationApplicationRepository applicationRepository,
                                              UserRepository userRepository,
                                              OrganizationApplicationMapper applicationMapper,
                                              ApplicationEventPublisher eventPublisher, OrganizationService organizationService, OrganizationRepository organizationRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.applicationMapper = applicationMapper;
        this.eventPublisher = eventPublisher;
        this.organizationService = organizationService;
        this.organizationRepository = organizationRepository;
    }

    @Override
    @Transactional
    public OrganizationApplicationResponseDto apply(OrganizationApplicationRequestDto requestDto,  String email) {

        Objects.requireNonNull(requestDto, "OrganizationApplicationRequestDto cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn("User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        List<OrganizationApplicationStatus> statuses =
                List.of(OrganizationApplicationStatus.APPROVED, OrganizationApplicationStatus.PENDING);

        boolean hasActiveApplication = applicationRepository.existsByUserIdAndApplicationStatusIn(user.getId(), statuses);

        if (hasActiveApplication) {
            throw new ApplicationAlreadyExistException("User already has an active organization application");
        }

        OrganizationApplication application = new OrganizationApplication();
        application.setOrganizationForm(requestDto.organizationForm());
        application.setOrganizationName(requestDto.organizationName());
        application.setUser(user);
        application.setApplicationStatus(OrganizationApplicationStatus.PENDING);
        application.setDescription(requestDto.description());
        application.setMemberRole(requestDto.memberRole());

        application.setPhone(requestDto.phone());
        application.setEmail(requestDto.email());
        application.setWebsite(requestDto.website());
        application.setRegistrationCountry(requestDto.registrationCountry());
        application.setCity(requestDto.city());
        application.setStreet(requestDto.street());
        application.setRegistrationNumber(requestDto.registrationNumber());

        application.setSubmittedAt(Instant.now());
        applicationRepository.save(application);

        logger.info("Organization application saved successfully {}", application.getId());

        eventPublisher.publishEvent(
                new OrganizationApplicationCreatedEvent(application.getId(), application.getOrganizationName())
        );
        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application);
    }

    @Override
    @Transactional
    public OrganizationApplicationResponseDto approve(Long applicationId) {

        OrganizationApplication application = applicationRepository.findById(applicationId).orElseThrow(() -> {
            logger.warn("Organization Application not found {}", applicationId);
            return new EntityNotFoundException("Organization Application not found");
        });

        if (application.getApplicationStatus() != OrganizationApplicationStatus.PENDING) {
            throw new OrganizationApplicationStatusException("Application already reviewed.");
        }

        validateOrganizationUniqueness(application);

        Organization organization = organizationService.createOrganization(application);

        application.setApplicationStatus(OrganizationApplicationStatus.APPROVED);
        application.setReviewedAt(Instant.now());
        application.setOrganization(organization);

        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application);
    }

    @Override
    @Transactional
    public OrganizationApplicationResponseDto reject(Long applicationId) {

        OrganizationApplication application = applicationRepository.findById(applicationId).orElseThrow(() -> {
            logger.warn("Organization Application not found {}", applicationId);
            return new EntityNotFoundException("Organization Application not found");
        });

        application.setApplicationStatus(OrganizationApplicationStatus.REJECTED);
        application.setReviewedAt(Instant.now());
        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application);
    }

    @Override
    public List<OrganizationApplicationResponseDto> getPendingOrganizationApplications() {
        List<OrganizationApplication> applications = applicationRepository.findAllByApplicationStatus(OrganizationApplicationStatus.PENDING);
        return applicationMapper.mapEntitiyToOrganizationApplicationResponseDtoList(applications);
    }

    @Override
    public List<OrganizationApplicationResponseDto> allOrganizationApplicationsByUser(Long userId) {
        List<OrganizationApplication> applications = applicationRepository.findAllByUserId(userId);
        return applicationMapper.mapEntitiyToOrganizationApplicationResponseDtoList(applications);
    }

    @Override
    public OrganizationApplicationResponseDto getOrganizationApplication(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.info("user not found{}", email);
            return new EntityNotFoundException("User not found");
        });

        return applicationRepository.findFirstByUserIdOrderBySubmittedAtDesc(user.getId())
                .map(applicationMapper::mapEntityToOrganizationApplicationResponseDto)
                .orElse(null);
    }

    private void validateOrganizationUniqueness(OrganizationApplication application) {

        if (organizationRepository.existsByPhone(application.getPhone())) {
            throw new DuplicateOrganizationException("An organization with this phone already exists");
        }

    }


}

package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.OrganizationApplication;
import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import de.upteams.volunteeros.dto.mapping.OrganizationApplicationMapper;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationRequestDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationApplicationStatusUpdateRequestDto;

import de.upteams.volunteeros.event.OrganizationApplicationStatusEvent;
import de.upteams.volunteeros.exceptions.types.ApplicationAlreadyExistException;
import de.upteams.volunteeros.repository.OrganizationApplicationRepository;

import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.OrganizationApplicationService;
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


    public OrganizationApplicationServiceImpl(OrganizationApplicationRepository applicationRepository,
                                              UserRepository userRepository,
                                              OrganizationApplicationMapper applicationMapper,
                                              ApplicationEventPublisher eventPublisher) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.applicationMapper = applicationMapper;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public OrganizationApplicationResponseDto applyForOrganization(OrganizationApplicationRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "OrganizationApplicationRequestDto cannot be null");

        User user = userRepository.findById(requestDto.userId()).orElseThrow(() -> {
            logger.warn("User not found {}", requestDto.userId());
            return new EntityNotFoundException("User with this id not found");
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
        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application);
    }

    @Override
    @Transactional
    public OrganizationApplicationResponseDto updateApplicationStatus(Long applicationId,
                                                                      OrganizationApplicationStatusUpdateRequestDto requestDto) {

        Objects.requireNonNull(requestDto, "OrganizationApplicationStatusUpdateRequestDto  cannot be null");

        OrganizationApplication application = applicationRepository.findById(applicationId).orElseThrow(() -> {
            logger.warn("Organization Application not found {}", applicationId);
            return new EntityNotFoundException("Organization Application this id not found");
        });

        Long userId = application.getUser().getId();

        application.setApplicationStatus(OrganizationApplicationStatus.valueOf(requestDto.applicationStatus()));
        application.setReviewedAt(Instant.now());

        eventPublisher.publishEvent(
                new OrganizationApplicationStatusEvent(
                        userId,
                        applicationId,
                        OrganizationApplicationStatus.valueOf(requestDto.applicationStatus()))
        );

        return applicationMapper.mapEntityToOrganizationApplicationResponseDto(application); // no need to return
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


}

package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.Organization;
import de.upteams.volunteeros.domain.model.OrganizationApplication;
import de.upteams.volunteeros.domain.model.OrganizationMember;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.dto.mapping.OrganizationMapper;
import de.upteams.volunteeros.dto.organization.OrganizationResponseDto;
import de.upteams.volunteeros.dto.organization.OrganizationUpdateRequestDto;
import de.upteams.volunteeros.exceptions.types.OrganizationAlreadyExistsException;
import de.upteams.volunteeros.exceptions.types.OrganizationNotFounException;
import de.upteams.volunteeros.repository.OrganizationRepository;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.OrganizationService;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
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
    private final UserRepository userRepository;


    public OrganizationServiceImpl(OrganizationRepository organizationRepository, OrganizationMapper organizationMapper, UserRepository userRepository) {
        this.organizationRepository = organizationRepository;
        this.organizationMapper = organizationMapper;
        this.userRepository = userRepository;
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Organization createOrganization(OrganizationApplication application) {

        Objects.requireNonNull(application, "Application cannot be null");

        if (organizationRepository.existsByOwnerId(application.getUser().getId())) {
            logger.info("Organization '{}' already exists.", application.getOrganizationName());
            throw new OrganizationAlreadyExistsException("Th use already has an organization");
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

        Organization organizationSaved = organizationRepository.save(organization);
        logger.info("Organization {} and Organization Member {} created", organization.getId(), organizationMember.getId());
        return organizationSaved;
    }

    @Override
    public OrganizationResponseDto getOrganization(String email) {

        return organizationRepository.findByOwnerEmail(email)
                .map(organizationMapper::mapEntityToOrganizationResponseDto)
                .orElse(null);
    }

    @Override
    @Transactional
    public OrganizationResponseDto editOrganization(Long organizationId, OrganizationUpdateRequestDto requestDto, String email) {

        Objects.requireNonNull(organizationId, "OrganizationId cannot be null");
        Objects.requireNonNull(requestDto, "OrganizationUpdateRequestDto cannot be null");

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

    @Override
    public List<OrganizationResponseDto> allOrganizations() {
        List<Organization> organizations = organizationRepository.findAll();
        return organizationMapper.mapEntityToOrganizationResponseDtoList(organizations);
    }
}

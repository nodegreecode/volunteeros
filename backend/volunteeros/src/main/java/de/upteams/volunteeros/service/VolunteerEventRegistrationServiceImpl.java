package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;
import de.upteams.volunteeros.domain.model.ProjectEvent;
import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;
import de.upteams.volunteeros.dto.mapping.VolunteerEventRegistrationMapper;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerCheckInResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationQRCodeResponseDto;
import de.upteams.volunteeros.dto.volunteereventregistration.VolunteerEventRegistrationResponseDto;
import de.upteams.volunteeros.exceptions.types.VolunteerEventRegistrationException;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.repository.VolunteerEventRegistrationRepository;
import de.upteams.volunteeros.service.interfaces.VolunteerEventRegistrationService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Objects;

@Service
public class VolunteerEventRegistrationServiceImpl implements VolunteerEventRegistrationService {

    private final Logger logger = LoggerFactory.getLogger(VolunteerEventRegistrationServiceImpl.class);

    private final UserRepository userRepository;
    private final VolunteerEventRegistrationRepository volunteerEventRegistrationRepository;
    private final VolunteerEventRegistrationMapper volunteerEventRegistrationMapper;
    private final QrCodeService qrCodeService;

    public VolunteerEventRegistrationServiceImpl(UserRepository userRepository, VolunteerEventRegistrationRepository volunteerEventRegistrationRepository, VolunteerEventRegistrationMapper volunteerEventRegistrationMapper, QrCodeService qrCodeService) {
        this.userRepository = userRepository;
        this.volunteerEventRegistrationRepository = volunteerEventRegistrationRepository;
        this.volunteerEventRegistrationMapper = volunteerEventRegistrationMapper;
        this.qrCodeService = qrCodeService;
    }

    @Override
    @Transactional
    public VolunteerEventRegistrationResponseDto cancel(Long registrationId, String email) {

        Objects.requireNonNull(registrationId, "RegistrationId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        VolunteerEventRegistration eventRegistration = volunteerEventRegistrationRepository.findByIdAndVolunteerId(registrationId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Event registration not found"));

        if (eventRegistration.getStatus() != VolunteerEventRegistrationStatus.REGISTERED) {
            throw new VolunteerEventRegistrationException("Only registered volunteers can cancel their registration");
        }

        eventRegistration.setStatus(VolunteerEventRegistrationStatus.CANCELLED);

        return volunteerEventRegistrationMapper.mapEntityToVolunteerEventRegistrationResponseDto(eventRegistration);
    }

    @Override
    public VolunteerEventRegistrationResponseDto qetRegistration(Long registrationId, String email) {

        Objects.requireNonNull(registrationId, "RegistrationId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        VolunteerEventRegistration eventRegistration = volunteerEventRegistrationRepository.findByIdAndVolunteerId(registrationId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Event registration not found"));

        return volunteerEventRegistrationMapper.mapEntityToVolunteerEventRegistrationResponseDto(eventRegistration);
    }

    @Override
    public VolunteerEventRegistrationQRCodeResponseDto qrCode(Long registrationId, String email) {

        Objects.requireNonNull(registrationId, "RegistrationId cannot be null");
        Objects.requireNonNull(email, "Current user email cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        VolunteerEventRegistration eventRegistration = volunteerEventRegistrationRepository.findByIdAndVolunteerId(registrationId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Event registration not found"));

        if (eventRegistration.getStatus() != VolunteerEventRegistrationStatus.REGISTERED) {
            throw new VolunteerEventRegistrationException("QR code is not available for this registration");
        }

        String qrToken = eventRegistration.getQrToken();

        byte[] qrBytes = qrCodeService.generateQrCode(qrToken);

        return new VolunteerEventRegistrationQRCodeResponseDto(
                eventRegistration.getId(),
                Base64.getEncoder().encodeToString(qrBytes));
    }

    @Override
    @Transactional
    public VolunteerCheckInResponseDto checkIn(String qrToken, String email) {

        Objects.requireNonNull(email, "Current user email cannot be null");
        Objects.requireNonNull(qrToken, "QR token cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        VolunteerEventRegistration eventRegistration = volunteerEventRegistrationRepository.findByQrTokenAndEventProjectOrganizationOwnerId(qrToken, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Event registration not found"));

        if (eventRegistration.getStatus() == VolunteerEventRegistrationStatus.ATTENDED) {
            throw new VolunteerEventRegistrationException("Volunteer already checked in");
        }

        eventRegistration.setStatus(VolunteerEventRegistrationStatus.ATTENDED);
        eventRegistration.setCheckedInAt(LocalDateTime.now());

        return volunteerEventRegistrationMapper.mapEntityToVolunteerCheckInResponseDto(eventRegistration);
    }

    @Override
    @Transactional
    public VolunteerEventRegistrationResponseDto noShow(Long registrationId, String email) {

        Objects.requireNonNull(email, "Current user email cannot be null");
        Objects.requireNonNull(registrationId, "RegistrationId cannot be null");

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            logger.warn(" User not found {}", email);
            return new EntityNotFoundException("User not found");
        });

        VolunteerEventRegistration eventRegistration = volunteerEventRegistrationRepository.findByIdAndEventProjectOrganizationOwnerId(registrationId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Event registration not found"));

        if (eventRegistration.getStatus() != VolunteerEventRegistrationStatus.REGISTERED) {
            throw new VolunteerEventRegistrationException("Only registered volunteers can be set to no show");
        }

        eventRegistration.setStatus(VolunteerEventRegistrationStatus.NO_SHOW);

        return volunteerEventRegistrationMapper.mapEntityToVolunteerEventRegistrationResponseDto(eventRegistration);
    }
}

package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;
import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VolunteerEventRegistrationRepository extends JpaRepository<VolunteerEventRegistration, Long> {

    Optional<VolunteerEventRegistration> findByIdAndVolunteerId(Long registrationId, Long volunteerId);

    Optional<VolunteerEventRegistration> findByQrToken(String qrToken);

    Optional<VolunteerEventRegistration> findByQrTokenAndEventProjectOrganizationOwnerId(String qrToken, Long ownerId);

    Optional<VolunteerEventRegistration> findByIdAndEventProjectOrganizationOwnerId(Long registrationId, Long ownerId);

    boolean existsByEventIdAndVolunteerId(Long eventId, Long volunteerId);

    long countByEventIdAndStatus(Long eventId, VolunteerEventRegistrationStatus status);
}

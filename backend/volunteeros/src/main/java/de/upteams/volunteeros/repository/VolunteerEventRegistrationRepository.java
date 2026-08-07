package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.enums.ProjectEventStatus;
import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;
import de.upteams.volunteeros.domain.model.VolunteerEventRegistration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface VolunteerEventRegistrationRepository extends JpaRepository<VolunteerEventRegistration, Long> {

    Optional<VolunteerEventRegistration> findByIdAndVolunteerId(Long registrationId, Long volunteerId);

    Optional<VolunteerEventRegistration> findByQrToken(String qrToken);

    Optional<VolunteerEventRegistration> findByQrTokenAndEventProjectOrganizationOwnerId(String qrToken, Long ownerId);

    Optional<VolunteerEventRegistration> findByIdAndEventProjectOrganizationOwnerId(Long registrationId, Long ownerId);

    boolean existsByEventIdAndVolunteerId(Long eventId, Long volunteerId);

    long countByEventIdAndStatus(Long eventId, VolunteerEventRegistrationStatus status);

    @Modifying
    @Query("""
            update VolunteerEventRegistration vr
                set vr.status = :noShowStatus
            where vr.event.id = :projectEventId
                and vr.status = :registeredStatus
            """)
    int markRegisteredAsNoShow(@Param("projectEventId") Long projectEventId,
                               @Param("noShowStatus") VolunteerEventRegistrationStatus noShowStatus,
                               @Param("registeredStatus") VolunteerEventRegistrationStatus registeredStatus);
}

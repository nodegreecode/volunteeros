package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.enums.VolunteerEventRegistrationStatus;
import de.upteams.volunteeros.event.ProjectEventStartedEvent;
import de.upteams.volunteeros.repository.VolunteerEventRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ProjectEventStartedListener {

    private final Logger logger = LoggerFactory.getLogger(ProjectEventStartedListener.class);

    private final VolunteerEventRegistrationRepository volunteerEventRegistrationRepository;

    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handle(ProjectEventStartedEvent event) {

        int updated = volunteerEventRegistrationRepository.markRegisteredAsNoShow(event.projectEventId(),
                VolunteerEventRegistrationStatus.NO_SHOW,
                VolunteerEventRegistrationStatus.REGISTERED);

        logger.info("Updated registrations: {}", updated);
    }
}

package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.Organization;
import de.upteams.volunteeros.domain.OrganizationApplication;
import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import de.upteams.volunteeros.event.OrganizationApplicationStatusEvent;
import de.upteams.volunteeros.repository.OrganizationApplicationRepository;

import de.upteams.volunteeros.service.interfaces.OrganizationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class OrganizationApplicationStatusListener {

    private final Logger logger = LoggerFactory.getLogger(OrganizationApplicationStatusListener.class);

    private final OrganizationApplicationRepository applicationRepository;
    private final OrganizationService organizationService;

    public OrganizationApplicationStatusListener(OrganizationApplicationRepository applicationRepository, OrganizationService organizationService) {
        this.applicationRepository = applicationRepository;
        this.organizationService = organizationService;
    }

    @TransactionalEventListener
    public void handle(OrganizationApplicationStatusEvent event) {
        logger.info("Listener invoked");

        if (event.applicationStatus() == OrganizationApplicationStatus.APPROVED) {
            OrganizationApplication application = applicationRepository.findById(event.applicationId()).orElseThrow(() -> {
                logger.warn("Organization Application not found {}", event.applicationId());
                return new EntityNotFoundException("Organization Application this id not found");
            });

         organizationService.createOrganization(application);
            logger.info("Organization for application {} created",  event.applicationId() );
        }

    }
}

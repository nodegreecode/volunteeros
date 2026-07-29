package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.ContentItem;
import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.enums.ContentType;
import de.upteams.volunteeros.event.ContentItemCreatedEvent;
import de.upteams.volunteeros.event.ProjectCreatedEvent;
import de.upteams.volunteeros.repository.ContentItemRepository;
import de.upteams.volunteeros.service.OrganizationServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class ProjectCreationEventListener {

    private final Logger logger = LoggerFactory.getLogger(ProjectCreationEventListener.class);

    private final ContentItemRepository contentItemRepository;
    private final ApplicationEventPublisher eventPublisher;

    @EventListener
    @Transactional
    public void handle(ProjectCreatedEvent event) {

        Project project = event.project();

        ContentItem contentItem = new ContentItem();
        contentItem.setContentType(ContentType.PROJECT);
        contentItem.setProject(project);
        project.getContentItems().add(contentItem);
        contentItem.setContentText(project.getDescription());
        contentItem.setCreatedAt(Instant.now());

        contentItemRepository.saveAndFlush(contentItem);
        logger.info("Content Item created {}", contentItem.getId());

        eventPublisher.publishEvent(
                new ContentItemCreatedEvent(
                        contentItem.getId()
                )
        );

    }
}

package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.model.ContentItem;
import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.event.ContentItemCreatedEvent;
import de.upteams.volunteeros.event.ProjectCreatedEvent;
import de.upteams.volunteeros.repository.ContentItemRepository;
import de.upteams.volunteeros.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProjectCreationEventListener {

    private final Logger logger = LoggerFactory.getLogger(ProjectCreationEventListener.class);

    private final ProjectRepository projectRepository;
    private final ContentItemRepository contentItemRepository;
    private final ApplicationEventPublisher eventPublisher;

    @EventListener
    @Transactional
    public void handle(ProjectCreatedEvent event) {

        Project project = projectRepository.findById(event.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        ContentItem contentItem = project.toContentItem();

        contentItemRepository.saveAndFlush(contentItem);

        logger.info("Content Item created {}", contentItem.getId());

        eventPublisher.publishEvent(
                new ContentItemCreatedEvent(
                        contentItem.getId()
                )
        );

    }


}

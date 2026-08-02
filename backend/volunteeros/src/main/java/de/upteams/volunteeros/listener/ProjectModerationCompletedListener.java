package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.enums.ContentType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.event.ModerationCompletedEvent;
import de.upteams.volunteeros.event.ProjectStatusChangedEvent;
import de.upteams.volunteeros.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProjectModerationCompletedListener {

    private final ApplicationEventPublisher eventPublisher;
    private final ProjectRepository projectRepository;

    @EventListener
    @Transactional
    public void handle(ModerationCompletedEvent event) {

        if (event.contentType() != ContentType.PROJECT) {
            return;
        }

        Project project = projectRepository.findById(event.entityId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (event.status() == ModerationCaseStatus.APPROVED) {
            project.setStatus(ProjectStatus.ACTIVE);
        }

        if (event.status() == ModerationCaseStatus.REJECTED) {
            project.setStatus(ProjectStatus.PENDING_MODERATION);
        }

        eventPublisher.publishEvent(new ProjectStatusChangedEvent(project.getId()));

    }

}

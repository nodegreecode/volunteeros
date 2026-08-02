package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.dto.moderation.ProjectModerationRequiredEvent;
import de.upteams.volunteeros.event.ProjectStatusChangedEvent;
import de.upteams.volunteeros.repository.ProjectRepository;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ProjectStatusChangedListener {

    private final ApplicationEventPublisher eventPublisher;
    private final ProjectRepository projectRepository;
    private final ProjectSearchService projectSearchService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(ProjectStatusChangedEvent event) {

        Project project = projectRepository.findById(event.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        projectSearchService.index(project);

        if (project.getStatus() == ProjectStatus.PENDING_MODERATION) {
            System.out.println("Entering ProjectModerationRequiredEvent");
            eventPublisher.publishEvent(new ProjectModerationRequiredEvent(project.getId(), project.getTitle()));
        }

    }
}

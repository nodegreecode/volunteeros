package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.dto.moderation.ProjectModerationRequiredEvent;
import de.upteams.volunteeros.event.ModerationCompletedEvent;
import de.upteams.volunteeros.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ModerationCompletedListener {

    private final ApplicationEventPublisher eventPublisher;
    private final ProjectRepository projectRepository;

    @EventListener
    @Transactional
    public void handle(ModerationCompletedEvent event) {

        Project project = projectRepository.findById(event.projectId()).orElseThrow();

        if (event.status() == ModerationCaseStatus.APPROVED) {
            project.setStatus(
                    ProjectStatus.ACTIVE
            );
        }


        if (event.status() == ModerationCaseStatus.REJECTED) {
            project.setStatus(
                    ProjectStatus.PENDING_MODERATION
            );
        }

        projectRepository.save(project);

        eventPublisher.publishEvent(new ProjectModerationRequiredEvent(project.getId()));

    }

}

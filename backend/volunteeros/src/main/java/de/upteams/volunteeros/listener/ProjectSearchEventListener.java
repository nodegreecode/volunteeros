package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.event.ProjectCreatedEvent;
import de.upteams.volunteeros.repository.ProjectRepository;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ProjectSearchEventListener {

    private final ProjectSearchService projectSearchService;
    private final ProjectRepository projectRepository;

    public ProjectSearchEventListener(ProjectSearchService projectSearchService, ProjectRepository projectRepository) {
        this.projectSearchService = projectSearchService;
        this.projectRepository = projectRepository;
    }

    @EventListener
    public void handle(ProjectCreatedEvent event) {
        Project project = projectRepository.findById(event.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        projectSearchService.index(project);
    }

}

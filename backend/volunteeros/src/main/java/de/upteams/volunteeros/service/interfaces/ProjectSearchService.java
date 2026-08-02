package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;

import java.util.List;

public interface ProjectSearchService {

    void index(Project project);

    void delete(Long id);

    List<ProjectResponseDto> search(String title);
}

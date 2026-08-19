package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.enums.CursorDirection;
import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.dto.project.CursorPage;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;

import java.util.List;

public interface ProjectSearchService {

    void index(Project project);

    void delete(Long id);

    CursorPage<ProjectResponseDto> search(String title, String cursor, int limit, CursorDirection direction);

    void reindexAll();

    void deleteIndex();
}

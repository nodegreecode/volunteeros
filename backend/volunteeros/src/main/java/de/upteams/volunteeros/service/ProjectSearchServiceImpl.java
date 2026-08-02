package de.upteams.volunteeros.service;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.dto.mapping.ProjectSearchMapper;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;
import de.upteams.volunteeros.repository.ProjectSearchRepository;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectSearchServiceImpl implements ProjectSearchService {

    private final ProjectSearchRepository projectSearchRepository;
    private final ProjectSearchMapper projectSearchMapper;

    public ProjectSearchServiceImpl(ProjectSearchRepository projectSearchRepository, ProjectSearchMapper projectSearchMapper) {
        this.projectSearchRepository = projectSearchRepository;
        this.projectSearchMapper = projectSearchMapper;
    }

    @Override
    public void index(Project project) {
        projectSearchRepository.save(projectSearchMapper.mapEntityToProjectDocument(project));
    }

    @Override
    public void delete(Long id) {
        projectSearchRepository.deleteById(id);
    }

    @Override
    public List<ProjectResponseDto> search(String title) {
        return projectSearchRepository.searchByTitle(title)
                .stream()
                .map(projectSearchMapper::mapProjectDocumentToProjectResponseDto)
                .toList();
    }
}

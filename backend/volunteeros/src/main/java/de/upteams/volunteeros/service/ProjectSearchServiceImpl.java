package de.upteams.volunteeros.service;

import co.elastic.clients.elasticsearch._types.SortOrder;
import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.model.ProjectDocument;
import de.upteams.volunteeros.dto.mapping.ProjectSearchMapper;
import de.upteams.volunteeros.dto.project.CursorPage;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;
import de.upteams.volunteeros.dto.project.ProjectSearchCursor;
import de.upteams.volunteeros.repository.ProjectRepository;
import de.upteams.volunteeros.repository.ProjectSearchRepository;
import de.upteams.volunteeros.service.interfaces.ProjectSearchService;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectSearchServiceImpl implements ProjectSearchService {

    private final ProjectRepository projectRepository;
    private final ProjectSearchRepository projectSearchRepository;
    private final ProjectSearchMapper projectSearchMapper;
    private final CursorService cursorService;
    private final ElasticsearchOperations elasticsearchOperations;

    public ProjectSearchServiceImpl(ProjectRepository projectRepository, ProjectSearchRepository projectSearchRepository, ProjectSearchMapper projectSearchMapper, CursorService cursorService, ElasticsearchOperations elasticsearchOperations) {
        this.projectRepository = projectRepository;
        this.projectSearchRepository = projectSearchRepository;
        this.projectSearchMapper = projectSearchMapper;
        this.cursorService = cursorService;
        this.elasticsearchOperations = elasticsearchOperations;
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
    public CursorPage<ProjectResponseDto> search(String title, String cursor, int limit) {

        ProjectSearchCursor decodedCursor = cursor != null ? cursorService.decode(cursor) : null;

        NativeQuery query = buildQuery(title, decodedCursor, limit);

        SearchHits<ProjectDocument> hits = elasticsearchOperations.search(query, ProjectDocument.class);

        List<SearchHit<ProjectDocument>> searchHits = new ArrayList(hits.getSearchHits());

        boolean hasNext = searchHits.size() > limit;

        if (hasNext) {
            searchHits = searchHits.subList(0, limit);
        }

        List<ProjectResponseDto> projects = searchHits
                .stream()
                .map(SearchHit::getContent)
                .map(projectSearchMapper::mapProjectDocumentToProjectResponseDto)
                .toList();

        String nextCursor = null;

        if (hasNext) {
            SearchHit<ProjectDocument> lastHit = searchHits.getLast();

            nextCursor = cursorService.encode(
                    new ProjectSearchCursor(
                            Instant.ofEpochMilli(((Number) lastHit.getSortValues().get(0)).longValue()),
                            ((Number) lastHit.getSortValues().get(1)).longValue()
                    )
            );
        }

        return new CursorPage<>(projects, nextCursor, null);
    }

    @Override
    public void reindexAll() {

        IndexOperations indexOperations = elasticsearchOperations.indexOps(ProjectDocument.class);

        if (!indexOperations.exists()) {
            indexOperations.create();
            indexOperations.putMapping();
        }

        projectRepository.findAll()
                .forEach(this::index);
    }

    @Override
    public void deleteIndex() {
        IndexOperations indexOperations = elasticsearchOperations.indexOps(ProjectDocument.class);

        if (indexOperations.exists()) {
            indexOperations.delete();
        }
    }

    private NativeQuery buildQuery(
            String title,
            ProjectSearchCursor cursor,
            int limit
    ) {
        NativeQueryBuilder builder = NativeQuery.builder()
                .withQuery(q -> q
                        .bool(b -> b
                                .must(m -> m
                                        .match(mt -> mt
                                                .field("title")
                                                .query(title)
                                        )
                                )
                                .filter(f -> f
                                        .term(t -> t
                                                .field("status")
                                                .value("ACTIVE")
                                        )
                                )
                        )
                )
                .withSort(s -> s
                        .field(f -> f
                                .field("createdAt")
                                .order(SortOrder.Desc)
                        )
                )
                .withSort(s -> s
                        .field(f -> f
                                .field("id")
                                .order(SortOrder.Desc)
                        )
                )
                .withMaxResults(limit + 1);

        if (cursor != null) {
            builder.withSearchAfter(List.of(
                    cursor.createdAt(),
                    cursor.id()
            ));
        }

        return builder.build();
    }
}

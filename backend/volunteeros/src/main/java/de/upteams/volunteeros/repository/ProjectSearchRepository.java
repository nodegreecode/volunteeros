package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.ProjectDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ProjectSearchRepository extends ElasticsearchRepository<ProjectDocument, Long> {

    @Query("""
            {
              "bool": {
                "must": [
                  {
                    "match": {
                      "title": {
                        "query": "?0"
                      }
                    }
                  },
                  {
                    "term": {
                      "status.keyword": {
                        "value": "ACTIVE"
                      }
                    }
                  }
                ]
              }
            }
            """)
    List<ProjectDocument> searchByTitle(String title);

}

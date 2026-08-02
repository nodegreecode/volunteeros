package de.upteams.volunteeros.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "projects")
@Getter
@Setter
public class ProjectDocument {

    @Id
    private Long id;

    private String title;

    private String description;

    private String location;

    private String startDate;

    private String endDate;

    private String status;

    private String requiredVolunteers;

    private ImageDocument image;

    private String createdAt;


    public static class ImageDocument {
        private String publicId;
        private String secureUrl;
    }

}

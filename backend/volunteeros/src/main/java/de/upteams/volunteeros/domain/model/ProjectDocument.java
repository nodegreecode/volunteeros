package de.upteams.volunteeros.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "projects")
@Getter
@Setter
public class ProjectDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String location;

    @Field(type = FieldType.Date)
    private String startDate;

    @Field(type = FieldType.Date)
    private String endDate;

    @Field(type = FieldType.Keyword)
    private String status;

    @Field(type = FieldType.Integer)
    private String requiredVolunteers;

    private ImageDocument image;

    @Field(type = FieldType.Date)
    private String createdAt;


    public static class ImageDocument {
        private String publicId;
        private String secureUrl;
    }

}

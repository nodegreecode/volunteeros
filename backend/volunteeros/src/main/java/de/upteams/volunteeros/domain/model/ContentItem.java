package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.enums.ContentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;

@Getter
@Setter
@Entity
public class ContentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "content_type", columnDefinition = "ocontent_type_enum")
    private ContentType contentType;

    @Column(name = "entity_id")
    private Long entityId;

    private String contentText;

    private Instant createdAt;

    private Instant updatedAt;

    @OneToOne(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    private ModerationCase moderationCase;

    public static ContentItem fromProject(Project project) {
        ContentItem contentItem = new ContentItem();
        contentItem.setContentType(ContentType.PROJECT);
        contentItem.setEntityId(project.getId());
        contentItem.setContentText(project.getDescription());
        contentItem.setCreatedAt(Instant.now());
        return contentItem;
    }

}

package de.upteams.volunteeros.domain;

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


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "entity_id")
    private Project project;

    private String contentText;

    private Instant createdAt;

    private Instant updatedAt;

    @OneToOne(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    private ModerationCase moderationCase;

}

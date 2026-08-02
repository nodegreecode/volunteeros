package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.enums.AiLabelType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;

@Setter
@Getter
@Entity
public class ModerationCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "content_id")
    private ContentItem content;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "ai_label", columnDefinition = "ai_label_enum")
    private AiLabelType aiLabelType;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "moderation_status_enum")
    private ModerationCaseStatus moderationCaseStatus;

    private String adminAction;

    private Instant createdAt;

    private Instant reviewedAt;

}

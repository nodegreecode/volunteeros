package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.contracts.IModeratable;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.exceptions.types.ProjectStatusUpdateException;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class Project implements IModeratable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @NotNull(message = "Title cannot be null")
    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotNull(message = "Location cannot be null")
    @NotBlank(message = "Location cannot be empty")
    private String location;

    @NotNull(message = "StartDate cannot be null")
    private Instant startDate;

    @NotNull(message = "EndDate title cannot be null")
    private Instant endDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "project_status_enum")
    private ProjectStatus status;

    @Min(value = 1, message = "Required volunteers must be at least 1")
    @Max(value = 25, message = "Required volunteers cannot exceed 25")
    private int requiredVolunteers;

    @CreationTimestamp
    private Instant createdAt;

    private Instant updatedAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectParticipation> participations = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    public Project() {
    }

    public void addParticipation(ProjectParticipation participation) {
        participations.add(participation);
        participation.setProject(this);
    }

    public void complete() {

        if (status == ProjectStatus.CANCELLED) {
            throw new IllegalStateException(
                    "Cancelled project cannot be completed"
            );
        }

        status = ProjectStatus.COMPLETED;
    }

    public void activate() {

        if (status == ProjectStatus.COMPLETED ||
                status == ProjectStatus.CANCELLED) {

            throw new ProjectStatusUpdateException(
                    "Completed or cancelled project cannot be activated"
            );
        }

        status = ProjectStatus.ACTIVE;
    }

    public void cancel() {

        if (status == ProjectStatus.COMPLETED ||
                status == ProjectStatus.CANCELLED) {

            throw new IllegalStateException(
                    "Completed or cancelled project cannot be cancelled"
            );
        }

        status = ProjectStatus.CANCELLED;
    }

    @Override
    public ContentItem toContentItem() {
        return ContentItem.fromProject(this);
    }
}

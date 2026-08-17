package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.enums.ProjectEventStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class ProjectEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    private String title;

    private String description;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    private String location;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "project_event_status")
    private ProjectEventStatus status;

    private LocalDateTime cancelledAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    private Set<VolunteerEventRegistration> registrations = new HashSet<>();

    public ProjectEvent() {
    }

    public void addRegistration(VolunteerEventRegistration registration) {
        registrations.add(registration);
        registration.setEvent(this);
    }

    public void removeRegistration(VolunteerEventRegistration registration) {
        registrations.remove(registration);
        registration.setEvent(null);
    }
}

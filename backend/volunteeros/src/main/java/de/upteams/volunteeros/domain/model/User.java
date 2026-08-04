package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.enums.UserStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "account")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(columnDefinition = "account_status")
    private UserStatus status;

    private boolean emailVerified;

    @Column(name = "created_at")
    private Instant createdAt;

    private boolean isEnabled;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<UserRole> roles = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile userProfile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectParticipation> participations = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private OrganizationMember organizationMember;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrganizationApplication> organizationApplications = new HashSet<>();

    @OneToOne(mappedBy = "owner")
    private Organization organization;

    @OneToMany(mappedBy = "volunteer", fetch = FetchType.LAZY)
    private Set<VolunteerEventRegistration> eventRegistrations = new HashSet<>();

    public User() {
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User user)) {
            return false;
        }
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return String.format("User: id - %d, email - %s, role - %s",
                id, email, roles);
    }

    public void addParticipation(ProjectParticipation participation) {
        participations.add(participation);
        participation.setUser(this);
    }

    public void removeParticipation(ProjectParticipation participation) {
        participations.remove(participation);
        participation.setUser(null);
    }

    public void addEventRegistration(VolunteerEventRegistration registration) {
        eventRegistrations.add(registration);
        registration.setVolunteer(this);
    }

    public void removeEventRegistration(VolunteerEventRegistration registration) {
        eventRegistrations.remove(registration);
        registration.setVolunteer(null);
    }

}

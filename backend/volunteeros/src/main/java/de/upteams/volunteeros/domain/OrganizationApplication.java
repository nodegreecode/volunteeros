package de.upteams.volunteeros.domain;

import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;

@Setter
@Getter
@Entity
public class OrganizationApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String organizationForm;

    private String organizationName;

    private String phone;

    private String website;

    private String email;

    private String registrationCountry;

    private String city;

    private String street;

    private String registrationNumber;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "organization_application_status")
    private OrganizationApplicationStatus applicationStatus;

    private String description;

    private String memberRole;

    private Instant submittedAt;

    private Instant reviewedAt;

    public OrganizationApplication() {
    }
}

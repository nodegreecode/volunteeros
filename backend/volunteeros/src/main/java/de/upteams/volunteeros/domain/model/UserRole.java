package de.upteams.volunteeros.domain.model;

import de.upteams.volunteeros.domain.enums.UserRoleType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;


@Setter
@Getter
@Entity
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "role", columnDefinition = "role_enum")
    private UserRoleType role;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private User user;

    private Instant assignedAt;

    public UserRole() {
    }
}


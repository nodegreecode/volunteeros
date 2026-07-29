package de.upteams.volunteeros.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@Entity
public class OrganizationMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private String memberRole;

    private Instant joinedAt;

    public OrganizationMember() {
    }
}

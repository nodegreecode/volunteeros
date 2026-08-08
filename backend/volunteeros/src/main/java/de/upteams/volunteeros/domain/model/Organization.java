package de.upteams.volunteeros.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Organization form title cannot be null")
    @NotBlank(message = "Organization form cannot be empty")
    private String orgForm;

    @NotNull(message = "Organization name cannot be null")
    @NotBlank(message = "Organization name cannot be empty")
    private String orgName;

    private String registrationCountry;

    private String city;

    private String phone;

    private String email;

    private String street;

    private String registrationNumber;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be empty")
    private String description;

    private String website;

    private Instant createdAt;

    private Instant updatedAt;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private Set<Project> projects = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private Set<OrganizationMember> members = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User owner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    public Organization() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organization organization)) {
            return false;
        }
        return id != null && Objects.equals(id, organization.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return String.format("Organization: id - %d, description - %s, website - %s, city - %s",
                id, description, website, city);
    }

    public void addProject(Project project) {
        projects.add(project);
        project.setOrganization(this);
    }
}

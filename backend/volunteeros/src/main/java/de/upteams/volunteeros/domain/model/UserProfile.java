package de.upteams.volunteeros.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id")
    private User user;

    @NotNull(message = "FirstName cannot be null")
    @NotBlank(message = "FirstName cannot be empty")
    @Size(min = 2, max = 50, message = "FirstName must be between 2 and 50 characters")
    private String firstName;

    @NotNull(message = "Lastname cannot be null")
    @NotBlank(message = "Lastname  cannot be empty")
    @Size(min = 2, max = 50, message = "Lastname  must be between 2 and 50 characters")
    private String lastName;

    private String city;

    private String phone;

    private String bio;

    private Instant createdAt;

    private Instant updatedAt;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Skill> skills = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    public UserProfile() {
    }


    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setVolunteer(this);
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setVolunteer(null);
    }
}

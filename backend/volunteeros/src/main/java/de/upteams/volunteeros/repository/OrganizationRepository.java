package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    boolean existsByOwnerId(Long ownerId);

    Optional<Organization> findByOwnerEmail(String email);
}

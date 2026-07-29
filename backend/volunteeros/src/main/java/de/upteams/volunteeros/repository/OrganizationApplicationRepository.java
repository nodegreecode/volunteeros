package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.OrganizationApplication;
import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrganizationApplicationRepository extends JpaRepository<OrganizationApplication, Long> {

    List<OrganizationApplication> findAllByUserId(Long userId);

    boolean existsByUserIdAndApplicationStatusIn(Long userId, List<OrganizationApplicationStatus> statuses);

    Optional<OrganizationApplication> findFirstByUserIdOrderBySubmittedAtDesc(Long userId);

    List<OrganizationApplication> findAllByApplicationStatus(OrganizationApplicationStatus applicationStatus);

}

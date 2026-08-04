package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.ProjectEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProjectEventRepository extends JpaRepository<ProjectEvent, Long> {

    List<ProjectEvent> findAllByProjectId(Long projectId);

    List<ProjectEvent> findAllByProjectIdAndDateGreaterThanEqual(Long projectId, LocalDate currentDate);

    Optional<ProjectEvent> findByIdAndProjectOrganizationId(Long eventId, Long organizationId);
}

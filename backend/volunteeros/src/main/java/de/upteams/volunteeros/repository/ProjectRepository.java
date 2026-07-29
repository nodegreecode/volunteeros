package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.dto.project.ProjectResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByIdAndOrganizationId(Long projectId, Long organizationId);

    @Query("""
        SELECT pp.project
        FROM ProjectParticipation pp
        WHERE pp.user.id = :userId
            AND pp.status = :status
    """)
    List<Project> findApprovedProjectsByVolunteerId(@Param("userId") Long userId,
                                            @Param("status") ParticipationStatus status);

    Optional<Project> findByIdAndStatus(Long id, ProjectStatus status);

    List<Project>  findAllByStatus(ProjectStatus status);

    List<Project> findByOrganizationOwnerId(Long userId);
}

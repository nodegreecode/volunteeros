package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.Project;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;
import de.upteams.volunteeros.domain.enums.ProjectStatus;
import de.upteams.volunteeros.domain.model.ProjectParticipation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByIdAndOrganizationId(Long projectId, Long organizationId);

    Optional<Project> findByIdAndOrganizationOwnerEmail(Long projectId, String email);

    @Query("""
                SELECT pp.project
                FROM ProjectParticipation pp
                WHERE pp.user.id = :userId
                    AND pp.status = :status
            """)
    List<Project> findApprovedProjectsByVolunteerId(@Param("userId") Long userId,
                                                    @Param("status") ParticipationStatus status);

    Optional<Project> findByIdAndStatus(Long id, ProjectStatus status);

    List<Project> findAllByStatus(ProjectStatus status);

    List<Project> findByOrganizationOwnerId(Long userId);

    List<Project> findByOrganizationOwnerIdAndStatus(Long userId, ProjectStatus status);

    @Query("""
                    SELECT p
                    FROM Project p
                    WHERE p.status = :status
                    ORDER BY p.createdAt DESC, p.id DESC
            """)
    List<Project> findFirstPage(@Param("status") ProjectStatus status,
                                Pageable pageable);


    @Query("""
                    SELECT p
                    FROM Project p
                    WHERE p.status = :status
                                AND p.createdAt < :createdAt
                                OR (p.createdAt = :createdAt AND p.id < :id)
                    ORDER BY p.createdAt DESC, p.id DESC
            """)
    List<Project> findNextPage(@Param("status") ProjectStatus status,
                               @Param("createdAt") Instant createdAt,
                               @Param("id") Long projectId,
                               Pageable pageable);

    @Query("""
                    SELECT p
                    FROM Project p
                    WHERE p.status = :status
                                AND (p.createdAt > :createdAt
                                OR (p.createdAt = :createdAt AND p.id > :id))
                    ORDER BY p.createdAt ASC, p.id ASC
            """)
    List<Project> findPreviousPage(@Param("status") ProjectStatus status,
                               @Param("createdAt") Instant createdAt,
                               @Param("id") Long projectId,
                               Pageable pageable);



}

package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.ProjectParticipation;
import de.upteams.volunteeros.domain.enums.ParticipationStatus;
import de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto;
import de.upteams.volunteeros.dto.project.ParticipantsResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectParticipationRepository extends JpaRepository<ProjectParticipation, Long> {

    boolean existsByUserIdAndStatusIn(Long userId, List<ParticipationStatus> statuses);

    List<ProjectParticipation> findByProjectId(Long projectId);

    Optional<ProjectParticipation> findByProjectIdAndUserId(Long projectId, Long  userId);

    @Query("""
    SELECT new  de.upteams.volunteeros.dto.participation.ProjectParticipationResponseDto(
        pp.id,
        p.id,
        p.title,
        o.orgName,
        u.id,
        pp.status,
        pp.joinedAt,
        pp.rejectedAt
    )
    FROM ProjectParticipation pp
        JOIN pp.project p
        JOIN p.organization o
        JOIN pp.user u
    WHERE u.id = :userId
    ORDER BY pp.joinedAt DESC
""")
    List<ProjectParticipationResponseDto> findParticipationsByUserId(
            @Param("userId") Long userId
    );

    @Query("""
    SELECT new de.upteams.volunteeros.dto.project.ParticipantsResponseDto(
        pp.id,
        p.id,
        p.title,
        u.id,
        up.firstName,
        up.lastName,
        pp.status,
        pp.joinedAt
    )
    FROM ProjectParticipation pp
        JOIN pp.project p
        JOIN pp.user u
        JOIN u.userProfile up
    WHERE p.organization.id = :organizationId
    ORDER BY pp.joinedAt DESC
""")
    List<ParticipantsResponseDto> findParticipantsByOrganizationId(
            @Param("organizationId") Long organizationId
    );
}

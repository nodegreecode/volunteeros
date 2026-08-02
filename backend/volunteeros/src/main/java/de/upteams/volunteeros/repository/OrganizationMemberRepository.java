package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.OrganizationMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, Long> {

    boolean existsByUserId(Long userId);
}

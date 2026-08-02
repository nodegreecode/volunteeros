package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.ModerationCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModerationCaseRepository extends JpaRepository<ModerationCase, Long> {
}

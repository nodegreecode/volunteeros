package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.model.ContentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentItemRepository extends JpaRepository<ContentItem, Long> {
}

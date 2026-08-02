package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

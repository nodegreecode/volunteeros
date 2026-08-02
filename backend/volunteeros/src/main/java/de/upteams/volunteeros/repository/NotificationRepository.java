package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUserEmailOrderByCreatedAtDesc(String email);

    List<Notification> findAllByUserEmailAndReadFalse(String email);

    long countByUserEmailAndReadFalse( String email);

    Optional<Notification> findByIdAndUserEmail(Long id, String email);
}

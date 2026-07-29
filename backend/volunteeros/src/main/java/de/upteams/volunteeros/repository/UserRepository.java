package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(
            attributePaths = {
                    "userProfile",
                    "roles",
            }
    )
    Optional<User> findByEmail(String email);


}

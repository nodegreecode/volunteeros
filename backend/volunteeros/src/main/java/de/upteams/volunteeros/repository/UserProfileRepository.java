package de.upteams.volunteeros.repository;

import de.upteams.volunteeros.domain.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    boolean existsByPhone(String phone);

}

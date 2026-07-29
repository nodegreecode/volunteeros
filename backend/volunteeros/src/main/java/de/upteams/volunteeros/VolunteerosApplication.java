package de.upteams.volunteeros;

import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.Role;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.security.config.JwtProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Instant;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
@EnableScheduling
public class VolunteerosApplication {

    public static void main(String[] args) {
        SpringApplication.run(VolunteerosApplication.class, args);
    }
}



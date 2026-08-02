package de.upteams.volunteeros;

import de.upteams.volunteeros.security.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
@EnableScheduling
public class VolunteerosApplication {

    public static void main(String[] args) {
        SpringApplication.run(VolunteerosApplication.class, args);
    }
}



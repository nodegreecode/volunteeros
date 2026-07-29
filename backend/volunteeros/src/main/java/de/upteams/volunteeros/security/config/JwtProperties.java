package de.upteams.volunteeros.security.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("jwt")
@Getter
@Setter
public class JwtProperties {

        private String accessSecret;
        private String refreshSecret;

        private long accessExpiration;
        private long refreshExpiration;
}

package de.upteams.volunteeros.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                title = "VolunteerOS REST API",
                version = "1.0",
                description = "API documentation for my Spring Boot application",
                contact = @Contact(
                        name = "Mars",
                        email = "dev@upteams.de"
                ),
                license = @License(
                        name = "Apache 2.0"
                )
        )
)
public class SwaggerConfig {
}

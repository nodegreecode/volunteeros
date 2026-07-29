package de.upteams.volunteeros.security.config;

import de.upteams.volunteeros.security.filter.TokenFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, TokenFilter filter) {

        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(AbstractHttpConfigurer::disable)

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("""
                            {
                              "error": "Unauthorized",
                              "message": "Authentication required"
                            }
                            """);
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            response.getWriter().write("""
                            {
                              "error": "Forbidden",
                              "message": "Insufficient permissions"
                            }
                            """);
                        })
                )

                .authorizeHttpRequests(x -> x
                                // AUTHENTICATION
                                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/auth/logout").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
                                // ME
                                .requestMatchers(HttpMethod.GET, "/api/me/profile").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/me/application").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.GET, "/api/me/projects").hasAnyRole("ORGANIZATION", "VOLUNTEER")
                                .requestMatchers(HttpMethod.GET, "/api/me/participations").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.GET, "/api/me/participants").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.PATCH, "/api/me/profile").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/me/skills").hasAnyRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.GET, "/api/me/skills").hasAnyRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.PATCH, "/api/me/skills/{skillId:\\d+}").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.DELETE, "/api/me/skills/{skillId:\\d+}").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.GET, "/api/me/organization").hasRole("ORGANIZATION")

                                // ORGANIZATIONS
                                .requestMatchers(HttpMethod.POST, "/api/organizations/applications").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.PATCH, "/api/organizations/applications/{applicationId:\\d+}/status").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/organizations/{userId:\\d+}/applications").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/organizations/applications").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/organizations").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/api/organizations/{organizationId:\\d+}").hasRole("ORGANIZATION")

                                // PROJECTS
                                .requestMatchers(HttpMethod.POST, "/api/projects/{organizationId:\\d+}").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.POST, "/api/projects/{projectId:\\d+}/participants").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/participants/{participationId:\\d+}/status").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/participants/{participationId:\\d+}/withdraw").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.GET, "/api/projects").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/projects/active").hasRole("VOLUNTEER")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/complete").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.DELETE, "/api/projects/{projectId:\\d+}/remove").hasRole("ORGANIZATION")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/active").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/cancel").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/projects/pending-moderation").hasRole("ADMIN")

                                // MODERATION
                                .requestMatchers(HttpMethod.GET, "/api/moderations/cases").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/api/moderations/cases/{caseId:\\d+}/status").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/admin/events").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/admin/monitoring/database").hasRole("ADMIN")

                                .requestMatchers(
                                        "/v3/api-docs/**",
                                        "/swagger-ui/**",
                                        "/swagger-ui.html"
                                ).permitAll()

                )
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }
}

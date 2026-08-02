package de.upteams.volunteeros.security.config;

import de.upteams.volunteeros.security.filter.TokenFilter;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder
    ) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) {
        return configuration.getAuthenticationManager();
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
                        .requestMatchers(HttpMethod.POST, "/api/auth/logout").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
                        //USER
                        .requestMatchers(HttpMethod.GET, "/api/users/profile").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/users/profile").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                        //SKILL
                        .requestMatchers(HttpMethod.POST, "/api/skills").hasAnyRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/api/skills").hasAnyRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.PATCH, "/api/skills/{skillId:\\d+}").hasRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.DELETE, "/api/skills/{skillId:\\d+}").hasRole("VOLUNTEER")
                        // NOTIFICATION
                        .requestMatchers(HttpMethod.GET, "/api/notifications").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/notifications/unread").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/notifications/unread-count").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/notifications/{id:\\d+}/read").hasAnyRole("ORGANIZATION", "VOLUNTEER", "ADMIN")

                        // ORGANIZATION APPLICATIONS
                        .requestMatchers(HttpMethod.POST, "/api/applications").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.GET, "/api/applications").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/{applicationId:\\d+}/approve").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/{applicationId:\\d+}/reject").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/applications/all").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/applications/{userId:\\d+}").hasRole("ADMIN")

                        // ORGANIZATIONS
                        .requestMatchers(HttpMethod.GET, "/api/organizations").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PATCH, "/api/organizations/{organizationId:\\d+}").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.GET, "/api/organizations/all").hasRole("ADMIN")

                        // PROJECTS
                        .requestMatchers(HttpMethod.POST, "/api/projects/{organizationId:\\d+}").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.POST, "/api/projects/{projectId:\\d+}/participants").hasRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/participants/{participationId:\\d+}/status").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/participants/{participationId:\\d+}/withdraw").hasRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/api/projects").hasAnyRole("ORGANIZATION", "VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/api/projects/all").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/projects/active").hasRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/api/projects/pending-moderation").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/complete").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/{projectId:\\d+}/remove").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/active").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/projects/{projectId:\\d+}/cancel").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/projects/participants/volunteer").hasRole("VOLUNTEER")
                        .requestMatchers(HttpMethod.GET, "/api/projects/participants/organization").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.POST, "/api/projects/{projectId:\\d+}/image").hasRole("ORGANIZATION")
                        .requestMatchers(HttpMethod.PUT, "/api/projects/{projectId:\\d+}/image").hasRole("ORGANIZATION")

                        // MODERATION SSE
                        .requestMatchers(HttpMethod.GET, "/api/moderations/cases").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/moderations/cases/{caseId:\\d+}/status").hasRole("ADMIN")

                        //.requestMatchers(HttpMethod.GET, "/api/admin/events").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/admin/monitoring/database").hasRole("ADMIN")

                        // SWAGGER
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // ASYNC
                        .dispatcherTypeMatchers(DispatcherType.ASYNC).authenticated()

                        // ETC
                        .anyRequest().authenticated()

                )
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }
}

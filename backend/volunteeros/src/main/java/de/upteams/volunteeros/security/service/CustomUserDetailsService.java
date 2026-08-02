package de.upteams.volunteeros.security.service;

import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.security.AuthUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> {
                    logger.warn("Authentication failed: user with email '{}' not found", email);
                    return new UsernameNotFoundException(String.format("User with email %s not found", email));
                }
        );
        return new AuthUserDetails(user);
    }
}

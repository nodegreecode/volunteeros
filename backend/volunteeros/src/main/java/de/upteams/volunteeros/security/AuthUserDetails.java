package de.upteams.volunteeros.security;

import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AuthUserDetails implements UserDetails {

    private final User user;

    public AuthUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        UserRole role = user.getRoles()
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("User has no role"));

        GrantedAuthority authority = new SimpleGrantedAuthority(role.getRole().name());
        return List.of(authority);
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}

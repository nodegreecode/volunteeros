package de.upteams.volunteeros.security.filter;

import de.upteams.volunteeros.security.dto.enums.TokenType;
import de.upteams.volunteeros.security.service.TokenService;
import de.upteams.volunteeros.security.service.interfaces.AuthService;
import de.upteams.volunteeros.service.interfaces.OrganizationService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final AuthService authService;


    public TokenFilter( TokenService tokenService, AuthService authService) {

        this.tokenService = tokenService;
        this.authService = authService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String accessToken = tokenService.getTokenFromRequest(request, TokenType.ACCESS_TOKEN.getValue());

        if (accessToken != null && tokenService.validateAccessToken(accessToken)) {
            Claims accessClaims = tokenService.getAccessClaims(accessToken);
            String email = accessClaims.getSubject();
            UserDetails userDetails = authService.loadUserByUsername(email);

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}

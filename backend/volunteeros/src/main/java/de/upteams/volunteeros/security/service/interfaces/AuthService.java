package de.upteams.volunteeros.security.service.interfaces;

import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService extends UserDetailsService {

    public void register(UserRegistrationDto registrationDto);

    public TokenResponseDto login(LoginRequestDto requestDto);

    public void logout(HttpServletRequest request, HttpServletResponse response);

    TokenResponseDto getAccessToken(HttpServletRequest request);

    void removeRefreshToken(HttpServletRequest request);


}

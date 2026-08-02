package de.upteams.volunteeros.security.service.interfaces;

import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService  {

    public void register(UserRegistrationDto registrationDto);

    public TokenResponseDto login(LoginRequestDto requestDto);

    public void logout(String refreshToken);

    TokenResponseDto getAccessToken(String refreshToken);

    void removeRefreshToken(HttpServletRequest request);

}

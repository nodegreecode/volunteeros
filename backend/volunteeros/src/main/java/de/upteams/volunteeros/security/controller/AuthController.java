package de.upteams.volunteeros.security.controller;

import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import de.upteams.volunteeros.security.dto.enums.TokenType;
import de.upteams.volunteeros.security.service.interfaces.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody UserRegistrationDto registrationDto) {
        authService.register(registrationDto);
        return "Registration complete";
    }

    @PostMapping("/login")
    public void login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response) {
        TokenResponseDto tokens = authService.login(requestDto);

        Cookie accessCookie = new Cookie(TokenType.ACCESS_TOKEN.getValue(), tokens.getAccessToken());
        accessCookie.setPath("/");
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(true);
        accessCookie.setAttribute("SameSite", "None");

        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie(TokenType.REFRESH_TOKEN.getValue(), tokens.getRefreshToken());
        refreshCookie.setPath("/");
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setAttribute("SameSite", "None");

        response.addCookie(refreshCookie);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
    }

    @PostMapping("/refresh")
    public void getNewAccessToken(HttpServletRequest requests, HttpServletResponse response) {
        TokenResponseDto tokens = authService.getAccessToken(requests);

        Cookie accessCookie = new Cookie(TokenType.ACCESS_TOKEN.getValue(), tokens.getAccessToken());
        accessCookie.setPath("/");
        accessCookie.setHttpOnly(true);
        //NEW
        accessCookie.setSecure(true);
        accessCookie.setAttribute("SameSite", "None");

        response.addCookie(accessCookie);
    }


}

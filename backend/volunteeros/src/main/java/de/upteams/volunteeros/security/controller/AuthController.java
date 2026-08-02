package de.upteams.volunteeros.security.controller;

import de.upteams.volunteeros.dto.volunteer.UserRegistrationDto;
import de.upteams.volunteeros.security.dto.LoginRequestDto;
import de.upteams.volunteeros.security.dto.TokenResponseDto;
import de.upteams.volunteeros.security.dto.enums.TokenType;
import de.upteams.volunteeros.security.service.TokenService;
import de.upteams.volunteeros.security.service.interfaces.AuthService;
import de.upteams.volunteeros.utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CookieUtils cookieUtils;
    private final AuthService authService;
    private final TokenService tokenService;

    public AuthController(CookieUtils cookieUtils, AuthService authService, TokenService tokenService) {
        this.cookieUtils = cookieUtils;
        this.authService = authService;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserRegistrationDto registrationDto) {
        authService.register(registrationDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response) {
        TokenResponseDto tokens = authService.login(requestDto);

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieUtils.createCookie(
                                TokenType.ACCESS_TOKEN.getValue(),
                                tokens.getAccessToken(),
                                Duration.ofMinutes(15))
                        .toString()
        );

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieUtils.createCookie(
                                TokenType.REFRESH_TOKEN.getValue(),
                                tokens.getRefreshToken(),
                                Duration.ofDays(7))
                        .toString()
        );

        return ResponseEntity
                .noContent()
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = tokenService.getTokenFromRequest(
                request,
                TokenType.REFRESH_TOKEN.getValue());

        authService.logout(refreshToken);

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieUtils.deleteCookie(TokenType.ACCESS_TOKEN.getValue()).toString());

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieUtils.deleteCookie(TokenType.REFRESH_TOKEN.getValue()).toString());

        return ResponseEntity
                .noContent()
                .build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> getNewAccessToken(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = tokenService.getTokenFromRequest(
                request,
                TokenType.REFRESH_TOKEN.getValue());

        TokenResponseDto tokens = authService.getAccessToken(refreshToken);

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookieUtils.createCookie(
                                TokenType.ACCESS_TOKEN.getValue(),
                                tokens.getAccessToken(),
                                Duration.ofMinutes(15))
                        .toString()
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}

package de.upteams.volunteeros.utils;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class CookieUtils {

    public ResponseCookie createCookie(String tokenName, String tokenValue, Duration maxAge) {
        return ResponseCookie.from(
                        tokenName,
                        tokenValue
                )
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(maxAge)
                .build();

    }


    public ResponseCookie deleteCookie(String tokenName) {
        return ResponseCookie.from(
                        tokenName,
                        null
                )
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(Duration.ZERO)
                .build();

    }


}

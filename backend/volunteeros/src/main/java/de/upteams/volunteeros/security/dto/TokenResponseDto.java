package de.upteams.volunteeros.security.dto;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenResponseDto {

    private String accessToken;

    private String refreshToken;

    public TokenResponseDto() {
    }

    public TokenResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }

    public TokenResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

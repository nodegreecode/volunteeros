package de.upteams.volunteeros.security.dto.enums;

public enum TokenType {

    ACCESS_TOKEN("Access-Token"),
    REFRESH_TOKEN("Refresh-Token");

    private final String value;

    TokenType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

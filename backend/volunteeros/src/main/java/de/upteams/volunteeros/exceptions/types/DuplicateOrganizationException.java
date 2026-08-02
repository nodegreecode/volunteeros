package de.upteams.volunteeros.exceptions.types;

public class DuplicateOrganizationException extends RuntimeException {
    public DuplicateOrganizationException(String message) {
        super(message);
    }
}

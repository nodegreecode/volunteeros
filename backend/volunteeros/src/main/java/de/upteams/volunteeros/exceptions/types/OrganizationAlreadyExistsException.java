package de.upteams.volunteeros.exceptions.types;

public class OrganizationAlreadyExistsException extends RuntimeException {
    public OrganizationAlreadyExistsException(String message) {
        super(message);
    }
}

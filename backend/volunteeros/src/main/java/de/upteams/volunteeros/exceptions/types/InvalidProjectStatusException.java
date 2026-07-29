package de.upteams.volunteeros.exceptions.types;

public class InvalidProjectStatusException extends RuntimeException {
    public InvalidProjectStatusException(String message) {
        super(message);
    }
}

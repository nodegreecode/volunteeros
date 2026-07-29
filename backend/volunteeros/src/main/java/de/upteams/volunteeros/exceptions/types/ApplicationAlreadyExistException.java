package de.upteams.volunteeros.exceptions.types;

public class ApplicationAlreadyExistException extends RuntimeException {
    public ApplicationAlreadyExistException(String message) {
        super(message);
    }
}

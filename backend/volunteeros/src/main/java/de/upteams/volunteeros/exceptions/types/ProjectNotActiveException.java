package de.upteams.volunteeros.exceptions.types;

public class ProjectNotActiveException extends RuntimeException {
    public ProjectNotActiveException(String message) {
        super(message);
    }
}

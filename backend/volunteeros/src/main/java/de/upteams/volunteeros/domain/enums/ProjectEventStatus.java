package de.upteams.volunteeros.domain.enums;

public enum ProjectEventStatus {
    PUBLISHED, CANCELLED, COMPLETED;

    public boolean canTransitionTo(ProjectEventStatus target) {
        return switch (this) {
            case PUBLISHED -> target == COMPLETED || target == CANCELLED;
            case COMPLETED, CANCELLED -> false;
        };
    }
}

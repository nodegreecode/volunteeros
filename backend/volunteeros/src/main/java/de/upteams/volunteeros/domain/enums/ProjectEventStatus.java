package de.upteams.volunteeros.domain.enums;

public enum ProjectEventStatus {
    PUBLISHED, CHECK_IN, IN_PROGRESS, CANCELLED, COMPLETED;

    public boolean canTransitionTo(ProjectEventStatus target) {
        return switch (this) {
            case PUBLISHED -> target == CHECK_IN || target == IN_PROGRESS || target == COMPLETED || target == CANCELLED;
            case CHECK_IN -> target == IN_PROGRESS || target == COMPLETED || target == CANCELLED;
            case IN_PROGRESS -> target == COMPLETED || target == CANCELLED;
            case COMPLETED, CANCELLED -> false;
        };
    }
}

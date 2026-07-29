package de.upteams.volunteeros.dto.moderation;

public record AdminNotificationEvent(    String type,
                                         Long projectId,
                                         String message) {
}

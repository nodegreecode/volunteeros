package de.upteams.volunteeros.dto.notification;

import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.NotificationType;

import java.time.Instant;

public record NotificationDto(Long id,
                              NotificationType type,
                              String title,
                              String message,
                              boolean read,
                              Instant createdAt) {
}

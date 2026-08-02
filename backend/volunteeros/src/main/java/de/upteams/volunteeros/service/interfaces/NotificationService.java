package de.upteams.volunteeros.service.interfaces;

import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.NotificationType;
import de.upteams.volunteeros.dto.notification.NotificationDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface NotificationService {

    void create(
            User user,
            NotificationType type,
            String title,
            String message
    );

    List<NotificationDto> getAll(String email);

    List<NotificationDto> getUnread(String email);

    long countUnread(String email);

    void markAsRead(Long notificationId, String email);
}

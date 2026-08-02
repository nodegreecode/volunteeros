package de.upteams.volunteeros.controller;

import de.upteams.volunteeros.dto.notification.NotificationDto;
import de.upteams.volunteeros.service.interfaces.NotificationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationDto> getMyNotifications(Authentication authentication) {
        return notificationService.getAll(authentication.getName());
    }

    @GetMapping("/unread")
    public List<NotificationDto> getMyUnreadNotifications(Authentication authentication) {
        return notificationService.getUnread(authentication.getName());
    }

    @GetMapping("/unread-count")
    public long getUnreadCount(Authentication authentication) {
        return notificationService.countUnread(authentication.getName());
    }

    @PatchMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id, Authentication authentication) {
        notificationService.markAsRead(id, authentication.getName()
        );
    }
}

package de.upteams.volunteeros.listener;


import de.upteams.volunteeros.domain.model.User;
import de.upteams.volunteeros.domain.enums.NotificationType;
import de.upteams.volunteeros.domain.enums.UserRoleType;
import de.upteams.volunteeros.dto.moderation.ProjectModerationRequiredEvent;

import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.NotificationService;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectModerationNotificationEventListener {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public ProjectModerationNotificationEventListener(UserRepository userRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Async
    @EventListener
    public void handle(ProjectModerationRequiredEvent event) {

        List<User> admins = userRepository.findAllByRolesRole(UserRoleType.ROLE_ADMIN);

        for (User admin : admins) {
            notificationService.create(
                    admin,
                    NotificationType.PROJECT_PENDING_MODERATION,
                    "New project requires moderation",
                    event.title()
            );
        }


    }
}

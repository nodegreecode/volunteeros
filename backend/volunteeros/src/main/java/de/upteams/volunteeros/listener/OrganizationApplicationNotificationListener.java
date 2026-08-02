package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.User;
import de.upteams.volunteeros.domain.enums.NotificationType;
import de.upteams.volunteeros.domain.enums.UserRoleType;
import de.upteams.volunteeros.event.OrganizationApplicationCreatedEvent;

import de.upteams.volunteeros.repository.UserRepository;
import de.upteams.volunteeros.service.interfaces.NotificationService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;

@Component
public class OrganizationApplicationNotificationListener {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public OrganizationApplicationNotificationListener(UserRepository userRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(OrganizationApplicationCreatedEvent event) {

        List<User> admins = userRepository.findAllByRolesRole(UserRoleType.ROLE_ADMIN);

        for (User admin : admins) {

            notificationService.create(
                    admin,
                    NotificationType.ORGANIZATION_APPLICATION_CREATED,
                    "New organization application",
                    event.organizationName()
            );
        }

    }
}

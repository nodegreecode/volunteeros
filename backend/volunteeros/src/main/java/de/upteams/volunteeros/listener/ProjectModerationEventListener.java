package de.upteams.volunteeros.listener;


import de.upteams.volunteeros.dto.moderation.AdminNotificationEvent;
import de.upteams.volunteeros.dto.moderation.ProjectModerationRequiredEvent;
import de.upteams.volunteeros.admin.AdminSsePublisher;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ProjectModerationEventListener {


    private final AdminSsePublisher publisher;

    public ProjectModerationEventListener(AdminSsePublisher publisher) {
        this.publisher = publisher;
    }


    @EventListener
    public void handle(ProjectModerationRequiredEvent event) {


        publisher.publish(
                new AdminNotificationEvent(
                        "PROJECT_PENDING_MODERATION",
                        event.projectId(),
                        "New project requires moderation"
                )
        );

    }
}

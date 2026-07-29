package de.upteams.volunteeros.event;

import de.upteams.volunteeros.domain.Organization;
import de.upteams.volunteeros.domain.Project;
import de.upteams.volunteeros.domain.User;

public record ProjectCreatedEvent(Project project,
                                  String description) {
}

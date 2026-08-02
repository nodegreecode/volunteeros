package de.upteams.volunteeros.event;

import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;

public record OrganizationApplicationCreatedEvent(Long applicationId,
                                                  String organizationName) {
}

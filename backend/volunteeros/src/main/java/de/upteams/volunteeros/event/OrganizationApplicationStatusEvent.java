package de.upteams.volunteeros.event;

import de.upteams.volunteeros.domain.enums.OrganizationApplicationStatus;

public record OrganizationApplicationStatusEvent(Long userId,
                                                 Long applicationId,
                                                 OrganizationApplicationStatus applicationStatus) {
}

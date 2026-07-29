package de.upteams.volunteeros.admin.dto;

import de.upteams.volunteeros.admin.enums.Severity;

public record DatabaseStatus(int activeConnections,
                             int idleConnections,
                             int waitingThreads,
                             int maxConnections,
                             double poolUtilization,
                             Severity severity) {
}

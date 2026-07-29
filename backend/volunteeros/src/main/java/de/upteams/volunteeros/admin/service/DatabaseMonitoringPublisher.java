package de.upteams.volunteeros.admin.service;

import de.upteams.volunteeros.admin.dto.DatabaseStatus;
import de.upteams.volunteeros.admin.service.interfaces.DatabaseHealthMonitor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DatabaseMonitoringPublisher {
    private final DatabaseHealthMonitor monitor;
    private final MonitoringSseService sseService;
    private DatabaseStatus previousStatus;

    public DatabaseMonitoringPublisher(
            DatabaseHealthMonitor monitor,
            MonitoringSseService sseService
    ) {
        this.monitor = monitor;
        this.sseService = sseService;
    }

    @Scheduled(fixedDelay = 5000)
    public void publish() {
        DatabaseStatus currentStatus = monitor.getStatus();
        sseService.send(currentStatus);
        /*if (!currentStatus.equals(previousStatus)) {
            sseService.send(currentStatus);
            previousStatus = currentStatus;
        }*/

    }

}

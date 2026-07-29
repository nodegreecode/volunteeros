package de.upteams.volunteeros.admin.service;

import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.HikariPoolMXBean;
import de.upteams.volunteeros.admin.dto.DatabaseStatus;
import de.upteams.volunteeros.admin.enums.Severity;
import de.upteams.volunteeros.admin.service.interfaces.DatabaseHealthMonitor;
import org.springframework.stereotype.Service;

@Service
public class DatabaseHealthMonitorImpl implements DatabaseHealthMonitor {

    private final HikariDataSource hikariDataSource;

    public DatabaseHealthMonitorImpl(HikariDataSource hikariDataSource) {
        this.hikariDataSource = hikariDataSource;
    }

    @Override
    public DatabaseStatus getStatus() {

        HikariPoolMXBean pool = hikariDataSource.getHikariPoolMXBean();

        int active = pool.getActiveConnections();
        int idle = pool.getIdleConnections();
        int waiting = pool.getThreadsAwaitingConnection();
        int max = hikariDataSource.getMaximumPoolSize();

        double utilization = max == 0 ? 0 : ((double) active / max) * 100;

        return new DatabaseStatus(
                active,
                idle,
                waiting,
                max,
                Math.round(utilization * 100.0) / 100.0,
                determineSeverity(active, waiting, max)
        );
    }

    private Severity determineSeverity(
            int active,
            int waiting,
            int max
    ) {

        double usage =
                ((double) active / max) * 100;

        if (waiting > 50) {
            return Severity.CRITICAL;
        }

        if (usage > 90) {
            return Severity.WARNING;
        }

        return Severity.OK;
    }
}

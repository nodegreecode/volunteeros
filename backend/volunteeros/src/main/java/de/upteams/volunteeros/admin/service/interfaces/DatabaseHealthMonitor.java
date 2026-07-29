package de.upteams.volunteeros.admin.service.interfaces;

import com.zaxxer.hikari.HikariDataSource;
import de.upteams.volunteeros.admin.dto.DatabaseStatus;

public interface DatabaseHealthMonitor {

    DatabaseStatus getStatus();
}

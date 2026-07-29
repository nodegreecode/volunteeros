package de.upteams.volunteeros.admin.controller;


import com.zaxxer.hikari.HikariDataSource;
import de.upteams.volunteeros.admin.dto.DatabaseStatus;
import de.upteams.volunteeros.admin.service.DatabaseHealthMonitorImpl;
import de.upteams.volunteeros.admin.service.MonitoringSseService;
import de.upteams.volunteeros.admin.service.interfaces.DatabaseHealthMonitor;
import de.upteams.volunteeros.dto.moderation.AdminNotificationEvent;
import de.upteams.volunteeros.admin.AdminSsePublisher;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/admin")
public class AdminNotificationController {

    private final MonitoringSseService sseService;
    private final AdminSsePublisher publisher;

    public AdminNotificationController(MonitoringSseService sseService, AdminSsePublisher publisher) {
        this.sseService = sseService;
        this.publisher = publisher;
    }

    @GetMapping(
            value = "/events",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public Flux<ServerSentEvent<AdminNotificationEvent>> events() {

        return publisher.stream()
                .map(event ->
                        ServerSentEvent.builder(event)
                                .event(event.type())
                                .build()
                );
    }

    @GetMapping(
            value = "/monitoring/database",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public SseEmitter stream() {
        return sseService.subscribe();
    }
}

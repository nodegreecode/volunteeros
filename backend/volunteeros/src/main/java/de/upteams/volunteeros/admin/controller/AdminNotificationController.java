package de.upteams.volunteeros.admin.controller;


import de.upteams.volunteeros.admin.service.MonitoringSseService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/admin")
public class AdminNotificationController {

    private final MonitoringSseService sseService;

    public AdminNotificationController(MonitoringSseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(
            value = "/monitoring/database",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public ResponseEntity<SseEmitter> stream() {
        SseEmitter emitter = sseService.subscribe();
        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                .header(HttpHeaders.CONNECTION, "keep-alive")
                .body(emitter);
    }
}

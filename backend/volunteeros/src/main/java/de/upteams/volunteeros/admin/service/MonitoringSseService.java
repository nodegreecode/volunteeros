package de.upteams.volunteeros.admin.service;

import de.upteams.volunteeros.admin.dto.DatabaseStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MonitoringSseService {
    private final Set<SseEmitter> emitters = ConcurrentHashMap.newKeySet();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(0L);

        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> {
            emitter.complete();
            emitters.remove(emitter);
        });
        emitter.onError(ex -> {
            emitter.complete();
            emitters.remove(emitter);
        });

        try {
            emitter.send(
                    SseEmitter.event()
                            .name("connected")
                            .data("SSE connection established")
            );
        } catch (Exception e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    public void send(DatabaseStatus status) {

        emitters.forEach(emitter -> {

            try {
                emitter.send(
                        SseEmitter.event()
                                .name("database-status")
                                .data(status)
                );

            } catch (Exception ex) {
                emitter.complete();
                emitters.remove(emitter);
            }
        });
    }
}

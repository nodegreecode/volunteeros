package de.upteams.volunteeros.admin.service;

import de.upteams.volunteeros.admin.dto.DatabaseStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MonitoringSseService {
    private final Set<SseEmitter> emitters =
            ConcurrentHashMap.newKeySet();

    public SseEmitter subscribe() {
        SseEmitter emitter =
                new SseEmitter(0L);
        emitters.add(emitter);
        emitter.onCompletion(
                () -> emitters.remove(emitter)
        );

        emitter.onTimeout(
                () -> emitters.remove(emitter)
        );

        emitter.onError(
                ex -> emitters.remove(emitter)
        );

        return emitter;
    }

    public void send(DatabaseStatus status) {

        emitters.removeIf(emitter -> {

            try {
                emitter.send(
                        SseEmitter.event()
                                .name("database-status")
                                .data(status)
                );

                return false;
            } catch (Exception ex) {
                return true;
            }
        });
    }
}

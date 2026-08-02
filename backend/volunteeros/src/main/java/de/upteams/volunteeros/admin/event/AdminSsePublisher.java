package de.upteams.volunteeros.admin.event;

import de.upteams.volunteeros.dto.moderation.AdminNotificationEvent;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Component
public class AdminSsePublisher{
    private final Sinks.Many<AdminNotificationEvent> sink =
            Sinks.many()
                    .multicast()
                    .onBackpressureBuffer();


    public void publish(AdminNotificationEvent event) {
        sink.tryEmitNext(event);
    }


    public Flux<AdminNotificationEvent> stream() {
        return sink.asFlux();
    }
}

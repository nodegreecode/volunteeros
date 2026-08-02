package de.upteams.volunteeros.listener;

import de.upteams.volunteeros.domain.model.ContentItem;
import de.upteams.volunteeros.dto.moderation.ModerationResultDto;
import de.upteams.volunteeros.event.ContentItemCreatedEvent;
import de.upteams.volunteeros.event.ModerationCompletedEvent;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.repository.ContentItemRepository;
import de.upteams.volunteeros.service.ContentModerationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ContentModerationListener {

    private final Logger logger = LoggerFactory.getLogger(ContentModerationListener.class);

    private final ContentItemRepository contentItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ContentModerationService contentModerationService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(ContentItemCreatedEvent event) {

        ContentItem item = contentItemRepository.findById(event.contentItemId()).orElseThrow(() -> {
            logger.warn("Content Item {} not found", event.contentItemId());
            return new AuthorizationException("Content Item not found");
        });

        ModerationResultDto resultDto = contentModerationService.moderate(item);

        eventPublisher.publishEvent(
                new ModerationCompletedEvent(
                        resultDto.contentItemId(),
                        resultDto.contentType(),
                        resultDto.entityId(),
                        resultDto.status()
                )
        );
    }
}

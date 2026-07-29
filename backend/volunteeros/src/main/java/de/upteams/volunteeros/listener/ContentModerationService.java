package de.upteams.volunteeros.listener;


import com.fasterxml.jackson.databind.ObjectMapper;
import de.upteams.volunteeros.domain.ContentItem;
import de.upteams.volunteeros.domain.ModerationCase;
import de.upteams.volunteeros.domain.enums.AiLabelType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import de.upteams.volunteeros.dto.moderation.ModerationAiResponseDto;
import de.upteams.volunteeros.event.ContentItemCreatedEvent;
import de.upteams.volunteeros.event.ModerationCompletedEvent;
import de.upteams.volunteeros.exceptions.types.AuthorizationException;
import de.upteams.volunteeros.repository.ContentItemRepository;
import de.upteams.volunteeros.repository.ModerationCaseRepository;
import de.upteams.volunteeros.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.Instant;

@Component
public class ContentModerationService {

    private final Logger logger = LoggerFactory.getLogger(ContentModerationService.class);

    private final ChatClient chatClient;
    private final ContentItemRepository contentItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ModerationCaseRepository moderationCaseRepository;
    private final ProjectRepository projectRepository;


    public ContentModerationService(ChatClient chatClient, ContentItemRepository contentItemRepository, ApplicationEventPublisher eventPublisher, ModerationCaseRepository moderationCaseRepository, ProjectRepository projectRepository) {
        this.chatClient = chatClient;
        this.contentItemRepository = contentItemRepository;
        this.eventPublisher = eventPublisher;
        this.moderationCaseRepository = moderationCaseRepository;
        this.projectRepository = projectRepository;

    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional
    public void moderateContent(ContentItemCreatedEvent event) {
        ContentItem item = contentItemRepository.findById(event.contentItemId()).orElseThrow(() -> {
            logger.warn("Content Item {} not found", event.contentItemId());
            return new AuthorizationException("Content Item not found");
        });

        try {
            String response = chatClient.prompt()
                    .user("""
                            You are a content moderation AI for a volunteer platform.
                            
                            Analyze the following content and classify it.
                            
                            Return ONLY valid JSON with this exact structure:
                            
                            {
                              "labelType": "SAFE | SPAM | HATE_SPEECH | HARASSMENT | VIOLENCE | SEXUAL_CONTENT | MISINFORMATION | SELF_HARM | OTHER",
                              "status": "APPROVED | REJECTED"
                            }
                            
                            Rules:
                            - SAFE content should be APPROVED.
                            - SPAM, HATE_SPEECH, HARASSMENT, VIOLENCE, SEXUAL_CONTENT, MISINFORMATION, and SELF_HARM should be REJECTED.
                            - If the content does not clearly match any category, use REJECTED.
                            - Do not include explanations.
                            
                            Content:
                            %s
                            """.formatted(item.getContentText()))
                    .call()
                    .content();

            String cleanResponse = response
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();


            ModerationAiResponseDto moderationResponse = new ObjectMapper().readValue(cleanResponse, ModerationAiResponseDto.class);

            ModerationCase moderationCase = new ModerationCase();
            moderationCase.setContent(item);
            moderationCase.setAiLabelType(moderationResponse.labelType());
            moderationCase.setModerationCaseStatus(moderationResponse.status());
            moderationCase.setCreatedAt(Instant.now());

            moderationCaseRepository.save(moderationCase);

            eventPublisher.publishEvent(
                    new ModerationCompletedEvent(item.getProject().getId(),
                            moderationResponse.status())
            );

        } catch (Exception e) {
            logger.error("AI moderation failed for content {}", item.getId(), e);

            ModerationCase moderationCase = new ModerationCase();
            moderationCase.setContent(item);
            moderationCase.setAiLabelType(AiLabelType.OTHER);
            moderationCase.setModerationCaseStatus(ModerationCaseStatus.REJECTED);
            moderationCase.setCreatedAt(Instant.now());

            moderationCaseRepository.save(moderationCase);

            eventPublisher.publishEvent(
                    new ModerationCompletedEvent(
                            item.getProject().getId(),
                            ModerationCaseStatus.REJECTED
                    )
            );
        }


    }
}

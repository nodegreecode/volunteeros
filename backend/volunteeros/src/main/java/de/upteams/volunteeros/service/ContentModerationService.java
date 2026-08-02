package de.upteams.volunteeros.service;


import de.upteams.volunteeros.domain.model.ContentItem;
import de.upteams.volunteeros.domain.model.ModerationCase;
import de.upteams.volunteeros.domain.enums.AiLabelType;
import de.upteams.volunteeros.domain.enums.ModerationCaseStatus;
import de.upteams.volunteeros.dto.moderation.ModerationAiResponseDto;
import de.upteams.volunteeros.dto.moderation.ModerationResultDto;
import de.upteams.volunteeros.repository.ModerationCaseRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ContentModerationService {

    private static final String MODERATION_PROMPT = """
            You are a content moderation AI for a volunteer platform.
            
            Analyze the user's content.
            
            Return ONLY a JSON object matching the requested schema.
            
            Classification rules:
            
            - SAFE -> APPROVED
            - SPAM -> REJECTED
            - HATE_SPEECH -> REJECTED
            - HARASSMENT -> REJECTED
            - VIOLENCE -> REJECTED
            - SEXUAL_CONTENT -> REJECTED
            - MISINFORMATION -> REJECTED
            - SELF_HARM -> REJECTED
            - If uncertain, use OTHER and REJECTED.
            """;

    private final Logger logger = LoggerFactory.getLogger(ContentModerationService.class);

    private final ChatClient chatClient;
    private final ModerationCaseRepository moderationCaseRepository;

    public ContentModerationService(ChatClient chatClient, ModerationCaseRepository moderationCaseRepository) {
        this.chatClient = chatClient;
        this.moderationCaseRepository = moderationCaseRepository;
    }

    @Transactional
    public ModerationResultDto moderate(ContentItem item) {


        ModerationAiResponseDto moderationResponse;

        try {

            moderationResponse = chatClient.prompt()
                    .system(MODERATION_PROMPT)
                    .user(item.getContentText())
                    .call()
                    .entity(ModerationAiResponseDto.class);


        } catch (Exception e) {
            logger.error("AI moderation failed for content {}", item.getId(), e);

            moderationResponse = new ModerationAiResponseDto(
                    AiLabelType.OTHER,
                    ModerationCaseStatus.REJECTED
            );
        }

        ModerationCase moderationCase = new ModerationCase();

        moderationCase.setContent(item);
        moderationCase.setAiLabelType(moderationResponse.labelType());
        moderationCase.setModerationCaseStatus(moderationResponse.status());
        moderationCase.setCreatedAt(Instant.now());

        moderationCaseRepository.save(moderationCase);

        return new ModerationResultDto(item.getId(), item.getContentType(), item.getEntityId(), moderationResponse.status());

    }
}

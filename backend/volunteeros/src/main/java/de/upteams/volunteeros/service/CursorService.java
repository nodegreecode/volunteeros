package de.upteams.volunteeros.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import de.upteams.volunteeros.dto.project.ProjectSearchCursor;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

@Component
public class CursorService {

    private final ObjectMapper objectMapper;

    private static final Base64.Encoder ENCODER = Base64.getUrlEncoder().withoutPadding();

    private static final Base64.Decoder DECODER = Base64.getUrlDecoder();

    public CursorService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String encode(ProjectSearchCursor cursor) {

        String json = objectMapper.writeValueAsString(cursor);

        return ENCODER.encodeToString(json.getBytes(StandardCharsets.UTF_8));
    }

    public ProjectSearchCursor decode(String cursor) {

        byte[] decoded = DECODER.decode(cursor);

        String json = new String(decoded, StandardCharsets.UTF_8);

        return objectMapper.readValue(json, ProjectSearchCursor.class);
    }
}

package de.upteams.volunteeros.dto.participation;

public record ProjectParticipationStatusUpdateResponseDto(

        String id,
        String projectId,
        String status,
        String updateAt
) {
}

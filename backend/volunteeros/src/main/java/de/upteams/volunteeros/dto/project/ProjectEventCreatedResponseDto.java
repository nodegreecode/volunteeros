package de.upteams.volunteeros.dto.project;

import de.upteams.volunteeros.domain.enums.ProjectEventStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ProjectEventCreatedResponseDto(Long id,
                                             Long projectId,
                                             String title,
                                             String description,
                                             LocalDate date,
                                             LocalTime startTime,
                                             LocalTime endTime,
                                             String location,
                                             Integer capacity,
                                             ProjectEventStatus status,
                                             LocalDateTime createdAt) {
}

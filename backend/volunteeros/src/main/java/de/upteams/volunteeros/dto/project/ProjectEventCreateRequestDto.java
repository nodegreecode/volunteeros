package de.upteams.volunteeros.dto.project;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ProjectEventCreateRequestDto(
        @NotBlank
        String title,
        String description,
        @NotNull
        LocalDate date,
        @NotNull
        LocalTime startTime,
        LocalTime endTime,
        String location,
        @Min(1)
        Integer capacity
) {
}

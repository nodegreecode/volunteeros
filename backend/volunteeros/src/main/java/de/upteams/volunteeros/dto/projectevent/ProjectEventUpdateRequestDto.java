package de.upteams.volunteeros.dto.projectevent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ProjectEventUpdateRequestDto(@NotBlank String title,
                                           String description,
                                           @NotNull LocalDate date,
                                           @NotNull LocalTime startTime,
                                           LocalTime endTime,
                                           String location,
                                           Integer capacity) {
}
